package org.gravity.window;


import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.lang.reflect.Method;
import java.util.HashMap;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import org.gravity.adapter.ActionListener;
import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.Point;
import org.gravity.adapter.Rect;
import org.gravity.game.GameBoard;
import org.gravity.game.Level;
import org.gravity.game.LevelLoader;
import org.gravity.game.Main;
import org.gravity.game.Menu;
import org.gravity.game.objects.GameObject;
import org.gravity.game.objects.Gradient;
import org.gravity.game.objects.Hole;
import org.gravity.game.objects.SinkHole;
import org.gravity.game.objects.Wall;


public class LevelBuilderWindow implements Window
{
	private GameBoard gameBoard;
	public static float framesPerSec;
	Point mouseLoc;
	int width, height;
	int time;

	LevelLoader levelLoader;
	Menu menu;
	JFrame frame = new JFrame();
	boolean mouseDown;
	GameObject lastObject;
	char lastKey;
	int lastKeyCode;
	ActionListener changeWindowListener;
	Windows curWindow;
	String title = "";
	int curLevel;
	Main parent;

	public LevelBuilderWindow(Adapter adapter, int width, int height,
			Main parent)
	{
		this.width = width;
		this.parent = parent;
		this.height = height;
		setGameBoard(new GameBoard(width, height));

		mouseLoc = new Point();
		levelLoader = new LevelLoader();
		menu = new Menu(adapter);
		createMenu();
		loadLevel(0);
		curLevel = 0;
		gameBoard.getBall().setWinListener(new ActionListener()
		{
			@Override
			public void actionPerformed()
			{
				menu.getMenuItem("Next Level").setVisible(true);
			}
		});
	}

	@Override
	public void draw(Adapter adapter)
	{
		gameBoard.draw(adapter);

		if (mouseDown)
			adapter.drawLine((int) gameBoard.getBall().getPosition().x,
					(int) gameBoard.getBall().getPosition().y, mouseLoc.x,
					mouseLoc.y, Color.black);
		menu.draw(adapter);
		adapter.fillRect(width - 40, 0, 40, 30, Color.black);
		adapter.fillRect(width - 35, 3, 30, 25, Color.white);
		adapter.drawText("" + lastKey, width - 30, 15, Color.black);
		adapter.drawText(title, width - 330, 23, Color.black);
	}

	@Override
	public void update()
	{
		gameBoard.update();
		if (lastObject != null)
		{
		}
	}

	@Override
	public void keyInputDown(KeyEvent e)
	{
		if (e.getKeyCode() != KeyEvent.VK_DELETE)
		{
			lastKeyCode = e.getKeyCode();
			lastKey = e.getKeyChar();
		} else
		{
			gameBoard.getLevel().deleteObject(lastObject);
			gameBoard.deleteObject(lastObject);
		}
	}

	@Override
	public void keyInputUp(KeyEvent e)
	{
		int curKey = e.getKeyCode();
		lastKeyCode = 1;
		if (curKey < 48 && curKey >= 48 + 10)
			this.lastKey = ' ';
		if (lastKey == 'j' || lastKey == 'k' || lastKey == 'l'
				|| lastKey == 'i')
		{
			this.lastKey = ' ';
			lastKeyCode = 1;
		}
	}

	@Override
	public void mouseInputDown(MouseEvent e)
	{
		if (!menu.isInside(new Point(e.getX(), e.getY()))
				&& !gameBoard.getBall().getActive())
		{
			Level level = gameBoard.getLevel();
			if (lastKey == '1')
			{
				level.setBallPos(e.getX(), e.getY());
				gameBoard.getBall().setPosition(e.getX(), e.getY());
			} else if (lastKey == '2')
			{
				level.setTargetPos(e.getX(), e.getY());
			} else if (lastKey == '3')
			{
				Wall w = new Wall(new Rect(e.getX() - 50, e.getY() - 50, 100,
						100));
				level.addSolid(w);
				lastObject = level.selectObject(new Point(e.getX(), e.getY()));
			} else if (lastKey == '4')
			{
				Hole h = new Hole(
						new Rect(e.getX() - 25, e.getY() - 25, 50, 50));
				level.addSolid(h);
				lastObject = level.selectObject(new Point(e.getX(), e.getY()));
			} else if (lastKey == '5')
			{
				SinkHole sh = new SinkHole(new Rect(e.getX() - 50,
						e.getY() - 50, 100, 100), 50, 1);
				level.addSolid(sh);
				lastObject = level.selectObject(new Point(e.getX(), e.getY()));
				createSinkHoleJFrame();

			} else if (lastKey == 's')
			{
				lastObject = level.selectObject(new Point(e.getX(), e.getY()));
				if (lastObject instanceof SinkHole)
				{
					createSinkHoleJFrame();
				}
				if (lastObject instanceof Gradient)
				{
					createGradientJFrame();
				}
			} else if (lastKey == '6')
			{
				Gradient sh = new Gradient((float) (Math.PI / 4.0f), 200);
				level.addSolid(sh);
				// sh.setSelected(true);
				lastObject = sh;
				createGradientJFrame();
			}
			gameBoard.updateLevel(level);
		}
	}

	private void createSinkHoleJFrame()
	{
		frame.setVisible(false);
		frame = new JFrame();
		final SinkHole sink = (SinkHole) lastObject;
		sink.setGameBoard(gameBoard);
		JPanel content = new JPanel();
		BoxLayout layout = new BoxLayout(content, 1);
		content.setLayout(layout);
		frame.setSize(200, 350);
		final HashMap<String, JTextField> fields = new HashMap<String, JTextField>();
		fields.put("X", addToFrame("Left", content, sink.getRect().x));
		fields.put("Y", addToFrame("Top", content, sink.getRect().y));
		fields.put("Width", addToFrame("Width", content, sink.getRect().width));
		fields.put("Height",
				addToFrame("Height", content, sink.getRect().height));
		fields.put("Depth", addToFrame("Depth", content, sink.getDepth()));
		fields.put("Std", addToFrame("Standard Dev.", content, sink.getStd()));

		JButton changeButton = new JButton("Change");
		changeButton.addActionListener(new java.awt.event.ActionListener()
		{
			@Override
			public void actionPerformed(java.awt.event.ActionEvent e)
			{
				updateFields(sink, fields);
			}
		});
		content.add(changeButton);
		JButton doneButton = new JButton("Done");
		doneButton.addActionListener(new java.awt.event.ActionListener()
		{

			@Override
			public void actionPerformed(java.awt.event.ActionEvent arg0)
			{
				updateFields(sink, fields);
				frame.setVisible(false);
			}
		});
		content.add(doneButton);
		frame.setVisible(true);
		frame.setAlwaysOnTop(true);

		frame.setContentPane(content);
	}

	private void createGradientJFrame()
	{
		frame.setVisible(false);
		frame = new JFrame();
		final Gradient sink = (Gradient) lastObject;
		sink.setGameBoard(gameBoard);
		JPanel content = new JPanel();
		BoxLayout layout = new BoxLayout(content, 1);
		content.setLayout(layout);
		frame.setSize(200, 350);
		final HashMap<String, JTextField> fields = new HashMap<String, JTextField>();

		fields.put("Depth", addToFrame("Depth", content, sink.getDepth()));
		fields.put("Angle", addToFrame("Angle", content, sink.getAngle()));
		JButton changeButton = new JButton("Change");
		changeButton.addActionListener(new java.awt.event.ActionListener()
		{
			@Override
			public void actionPerformed(java.awt.event.ActionEvent e)
			{
				updateFields(sink, fields);
			}
		});
		content.add(changeButton);
		JButton doneButton = new JButton("Done");
		doneButton.addActionListener(new java.awt.event.ActionListener()
		{

			@Override
			public void actionPerformed(java.awt.event.ActionEvent arg0)
			{
				updateFields(sink, fields);
				frame.setVisible(false);
			}
		});
		content.add(doneButton);
		frame.setVisible(true);
		frame.setAlwaysOnTop(true);

		frame.setContentPane(content);
	}

	private void updateFields(final GameObject sink,
			final HashMap<String, JTextField> fields)
	{
		for (String field : fields.keySet())
		{
			JTextField textField = fields.get(field);
			try
			{
				Method updater = sink.getClass().getMethod("set" + field,
						new Class[]
						{ Float.class });
				if (textField.getText().length() <= 0)
					textField.setText("0");
				updater.invoke(sink, Float.parseFloat(textField.getText()));
			} catch (Exception e2)
			{
				e2.printStackTrace();
			}
		}
	}

	private JTextField addToFrame(String text, JPanel content, float initial)
	{
		content.add(new JLabel(text));
		JTextField field = new JTextField(10);
		field.setText("" + initial);
		content.add(field);
		return field;
	}

	@Override
	public void mouseInputUp(MouseEvent e)
	{

	}

	public void createMenu()
	{
		menu.addItem("Menu", new ActionListener()
		{

			@Override
			public void actionPerformed()
			{
				curWindow = Window.Windows.OPENINGWINDOW;
				changeWindowListener.actionPerformed();
			}
		});
		menu.addItem("Load", new ActionListener()
		{

			@Override
			public void actionPerformed()
			{
				JFileChooser loader = new JFileChooser();
				loader.setSelectedFile(new File(System.getProperty("user.dir")
						+ "../../levels/" + title));
				loader.setApproveButtonText("Load");
				int returnVal = loader.showOpenDialog(parent);
				if (returnVal == JFileChooser.APPROVE_OPTION)
				{
					File savedFile = loader.getSelectedFile();
					levelLoader.putNewLevel("/levels/" + savedFile.getName());

					title = savedFile.getName();
					curLevel = levelLoader.getLevelCount() - 1;
					loadLevel(curLevel);
				}
			}
		});

		menu.addItem("Save", new ActionListener()
		{
			@Override
			public void actionPerformed()
			{
				JFileChooser saver = new JFileChooser();
				saver.setSelectedFile(new File(System.getProperty("user.dir")
						+ "../../levels/" + title));
				saver.setApproveButtonText("Save");
				int returnVal = saver.showSaveDialog(parent);
				if (returnVal == JFileChooser.APPROVE_OPTION)
				{
					File savedFile = saver.getSelectedFile();
					gameBoard.getLevel().saveLevel(savedFile);
				}
			}
		});
		menu.addItem("Test", new ActionListener()
		{

			@Override
			public void actionPerformed()
			{

				JFrame frame = new JFrame();
				Image offsc = new BufferedImage(width, height,
						BufferedImage.TYPE_INT_RGB);
				Graphics mainoffg = offsc.getGraphics();
				Main main = new Main(offsc, mainoffg);
				main.init();
				main.setCurWindow(Window.Windows.GAME);
				main.setLevel(gameBoard.getLevel());
				frame.setContentPane(main);
				frame.setSize(width + 10, height + 30);
				frame.setVisible(true);
				frame.setAlwaysOnTop(true);

			}
		});

	}

	public void loadLevel(int curLevel2)
	{
		gameBoard.getBall().reset();
		curLevel = curLevel2;
		Level level = levelLoader.loadLevel(curLevel2);
		gameBoard.getBall().setPosition(level.getBallPos().x,
				level.getBallPos().y);
		getGameBoard().createBoard(level);
	}

	public void mouseInputDragged(MouseEvent e)
	{
		mouseLoc = new Point(e.getX(), e.getY());
	}

	@Override
	public void setChangeWindowListener(ActionListener al)
	{
		this.changeWindowListener = al;
	}

	@Override
	public Windows getCurWindow()
	{
		return curWindow;
	}

	public void deactivateButtons()
	{
		menu.deactivateButtons();
	}

	public void activateButtons()
	{
		menu.activateButtons();
	}

	public GameBoard getGameBoard()
	{
		return gameBoard;
	}

	public void setGameBoard(GameBoard gameBoard)
	{
		this.gameBoard = gameBoard;
	}

}
