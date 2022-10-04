package org.gravity.window;


import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;

import org.gravity.adapter.ActionListener;
import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.Point;
import org.gravity.adapter.PointF;
import org.gravity.game.GameBoard;
import org.gravity.game.Level;
import org.gravity.game.LevelLoader;
import org.gravity.game.Main;
import org.gravity.game.Menu;
import org.gravity.game.objects.DirectionArrow;


public class GameWindow implements Window
{
	private GameBoard gameBoard;
	public static float framesPerSec;
	Point mouseLoc;
	int width, height;
	int time;
	LevelLoader levelLoader;
	Menu menu;
	boolean mouseDown;
	ActionListener changeWindowListener;
	Windows curWindow;
	int curLevel;
	DirectionArrow directionArrow;

	public GameWindow(Adapter adapter, int width, int height)
	{
		this.width = width;
		this.height = height;
		setGameBoard(new GameBoard(width, height));
		mouseLoc = new Point();
		levelLoader = new LevelLoader();
		menu = new Menu(adapter);
		directionArrow = new DirectionArrow();
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
		adapter.fillRect(0, 0, width, height, Color.black);
		//
		getGameBoard().draw(adapter);
		if (mouseDown)
		{
			adapter.drawLine((int) gameBoard.getBall().getPosition().x,
					(int) gameBoard.getBall().getPosition().y, mouseLoc.x,
					mouseLoc.y, Color.black);
			directionArrow.draw(adapter);
		}
		menu.draw(adapter);
		adapter.drawText("FPS: " + framesPerSec, 500, 20, Color.fromArgb(255, 0, 0));
	}

	@Override
	public void update()
	{
		time++;
		getGameBoard().update();
		getGameBoard().updateBall();
	}

	@Override
	public void keyInputDown(KeyEvent e)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void keyInputUp(KeyEvent e)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseInputDown(MouseEvent e)
	{
		if (!menu.isInside(new Point(e.getX(), e.getY()))
				&& !gameBoard.getBall().getActive() && time > 10)
		{
			mouseDown = true;
			mouseLoc = new Point(e.getX(), e.getY());
			directionArrow.setPosition(gameBoard.getBall().getPosition());
		}
	}

	@Override
	public void mouseInputUp(MouseEvent e)
	{
		if (!menu.isInside(new Point(e.getX(), e.getY()))
				&& !gameBoard.getBall().getActive() && time > 10)
		{
			mouseDown = false;
			gameBoard.getBall().fire(new PointF(e.getX(), e.getY()));
			directionArrow.fire();
		}

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
				time = 0;
				menu.getMenuItem("Next Level").setVisible(false);
			}
		});
		menu.addItem("Settings", new ActionListener()
		{

			@Override
			public void actionPerformed()
			{
				curWindow = Window.Windows.OPENINGWINDOW;
				time = 0;
				changeWindowListener.actionPerformed();
			}
		});
		menu.addItem("Restart", new ActionListener()
		{

			@Override
			public void actionPerformed()
			{
				if (!Main.test)
					loadLevel(curLevel);
				else
				{
					PointF pos = gameBoard.getLevel().getBallPos();
					gameBoard.getBall().setPosition(pos.x, pos.y);
					gameBoard.getBall().reset();
				}
			}
		});
		menu.addItem("Next Level", new ActionListener()
		{

			@Override
			public void actionPerformed()
			{

				if (levelLoader.hasLevel(++curLevel))
				{
					loadLevel(curLevel);
					menu.getMenuItem("Next Level").setVisible(false);
				} else
					curLevel--; // in the event that the next level doesn't
								// exist
			}
		});
		menu.getMenuItem("Next Level").setVisible(false);
	}

	public void loadLevel(int curLevel2)
	{
		gameBoard.getBall().reset();
		// gameBoard.getLevel()
		curLevel = curLevel2;
		Level level = levelLoader.loadLevel(curLevel2);
		gameBoard.getBall().setPosition(level.getBallPos().x,
				level.getBallPos().y);
		getGameBoard().createBoard(level);
	}

	public void mouseInputDragged(MouseEvent e)
	{
		mouseLoc = new Point(e.getX(), e.getY());
		directionArrow.update(mouseLoc);
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
