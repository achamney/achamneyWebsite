package org.gravity.window;


import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

import org.gravity.adapter.ActionListener;
import org.gravity.adapter.Adapter;
import org.gravity.adapter.Button;
import org.gravity.adapter.Color;
import org.gravity.game.LevelLoader;


public class LevelSelectWindow implements Window
{
	List<Button> buttonList;
	Windows curWindow;
	ActionListener changeWindowListener;
	LevelLoader levelLoader;
	int loadLevel = 0;
	int width, height;

	public LevelSelectWindow(Adapter a, int width, int height)
	{
		this.width = width;
		this.height = height;
		levelLoader = new LevelLoader();
		buttonList = new ArrayList<Button>();
		int levelsPerRow = 5;
		int count = 0;
		for (int i = 0; i < Math.ceil((float) levelLoader.getLevelCount()
				/ (float) levelsPerRow); i++)
		{
			for (int j = 0; j < levelsPerRow; j++)
			{
				count++;
				if (count <= levelLoader.getLevelCount())
				{
					final Button b = new Button(a, j * 100 + 50, 130 + i * 50,
							70, 35, "Level: " + count);
					b.addActionListener(new ActionListener()
					{
						@Override
						public void actionPerformed()
						{
							curWindow = Window.Windows.GAME;
							loadLevel = Integer.parseInt(b.getText().substring(
									7, b.getText().length()));
							changeWindowListener
									.actionPerformed();
						}

					});
					buttonList.add(b);
				}
			}
		}
		Button b = new Button(a, 400, 50, 70, 35, "Back");
		b.addActionListener(new ActionListener()
		{
			@Override
			public void actionPerformed()
			{
				curWindow = Window.Windows.OPENINGWINDOW;
				changeWindowListener.actionPerformed();
			}
		});
		buttonList.add(b);
	}

	@Override
	public void draw(Adapter a)
	{
		a.fillRect(0, 0, width, height, Color.black);
		a.drawText("Gravity Game", 50, 100, Color.fromArgb(255, 0, 0));
		for (Button b : buttonList)
		{
			b.draw(a);
		}
	}

	@Override
	public void update()
	{

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
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseInputUp(MouseEvent e)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void setChangeWindowListener(ActionListener al)
	{
		changeWindowListener = al;
	}

	@Override
	public Windows getCurWindow()
	{
		return curWindow;
	}

	public int getLoadLevel()
	{
		return loadLevel;
	}

	public void deactivateButtons()
	{
		for (Button b : buttonList)
		{
			b.setActive(false);
		}
	}

	public void activateButtons()
	{
		for (Button b : buttonList)
		{
			b.setActive(true);
		}
	}
}
