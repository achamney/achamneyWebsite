package org.gravity.game;

import java.applet.Applet;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.ArrayList;
import java.util.List;

import javax.swing.Timer;

import org.gravity.adapter.ActionListener;
import org.gravity.adapter.AppletAdapter;
import org.gravity.window.GameWindow;
import org.gravity.window.LevelBuilderWindow;
import org.gravity.window.LevelSelectWindow;
import org.gravity.window.MainWindow;
import org.gravity.window.Window;
import org.gravity.window.Window.Windows;



public class Main extends Applet implements java.awt.event.ActionListener, MouseListener,
		MouseMotionListener, KeyListener
{

	/**
	 * 
	 */
	int width = 800, height = 400;
	Image offscreen;
	Graphics offg;
	AppletAdapter adapter;
	List<Window> windows;
	Windows curWindow = Window.Windows.OPENINGWINDOW;
	Timer timer1;
	private static final long serialVersionUID = 1L;
	public static boolean test = false;

	public Main()
	{

	}

	public Main(Image offscreen, Graphics offg)
	{
		this.offscreen = offscreen;
		this.offg = offg;
		test = true;
	}

	public void init()
	{
		this.setSize(width, height);
		if (!test)
		{
			offscreen = this.createImage(width, height);
			offg = offscreen.getGraphics();
		}
		adapter = new AppletAdapter(this, offg);

		timer1 = new Timer(10, this);
		timer1.start();

		this.addMouseListener(this);
		this.addMouseMotionListener(this);
		this.addKeyListener(this);
		createWindows();

	}

	public void paint(Graphics g)
	{
		long timenow = System.currentTimeMillis();
		windows.get(curWindow.ordinal()).draw(adapter);
		//

		g.drawImage(offscreen, 0, 0, null);
		repaint();
		timenow = System.currentTimeMillis() - timenow;
		if (timenow == 0)
			GameWindow.framesPerSec = 1000;
		else
			GameWindow.framesPerSec = 1000 / timenow;
		if(timenow < 11)
		{
			try
			{
				Thread.sleep(10- timenow);
			} catch (InterruptedException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public void update(Graphics g)
	{
		paint(g);
	}

	@Override
	public void actionPerformed(java.awt.event.ActionEvent arg0)
	{
		windows.get(curWindow.ordinal()).update();
	}

	@Override
	public void mouseClicked(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseEntered(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseExited(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void mousePressed(MouseEvent e)
	{
		windows.get(curWindow.ordinal()).mouseInputDown(e);
	}

	@Override
	public void mouseReleased(MouseEvent e)
	{
		windows.get(curWindow.ordinal()).mouseInputUp(e);
	}

	@Override
	public void mouseDragged(MouseEvent e)
	{
		if (windows.get(curWindow.ordinal()) instanceof GameWindow)
		{
			((GameWindow) windows.get(curWindow.ordinal()))
					.mouseInputDragged(e);
		}
	}

	@Override
	public void mouseMoved(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	public void createWindows()
	{
		windows = new ArrayList<Window>();

		MainWindow mWind = new MainWindow(adapter, width, height);
		windows.add(mWind);
		mWind.activateButtons();

		final LevelSelectWindow lsWind = new LevelSelectWindow(adapter, width,
				height);
		windows.add(lsWind);

		final GameWindow gWind = new GameWindow(adapter, width, height);
		windows.add(gWind);

		LevelBuilderWindow lbWind = new LevelBuilderWindow(adapter, width,
				height, this);
		windows.add(lbWind);

		for (final Window w : windows)
		{
			w.setChangeWindowListener(new ActionListener()
			{
				@Override
				public void actionPerformed()
				{
					w.deactivateButtons();
					curWindow = w.getCurWindow();
					windows.get(curWindow.ordinal()).activateButtons();
				}
			});
			if (w instanceof LevelSelectWindow)
			{
				w.setChangeWindowListener(new ActionListener()
				{

					@Override
					public void actionPerformed()
					{
						curWindow = w.getCurWindow();
						if (curWindow == Window.Windows.GAME)
						{
							gWind.loadLevel(lsWind.getLoadLevel() - 1);
						}
						lsWind.deactivateButtons();
						windows.get(curWindow.ordinal()).activateButtons();
					}
				});
			}
		}
	}

	public void setCurWindow(Windows wind)
	{
		windows.get(curWindow.ordinal()).deactivateButtons();
		this.curWindow = wind;
		windows.get(curWindow.ordinal()).activateButtons();
	}

	public void setLevel(Level level)
	{
		((GameWindow) windows.get(curWindow.ordinal())).getGameBoard()
				.createBoard(level);
	}

	@Override
	public void keyPressed(KeyEvent e)
	{
		windows.get(curWindow.ordinal()).keyInputDown(e);
	}

	@Override
	public void keyReleased(KeyEvent e)
	{
		windows.get(curWindow.ordinal()).keyInputUp(e);
	}

	@Override
	public void keyTyped(KeyEvent arg0)
	{
		// TODO Auto-generated method stub

	}
}
