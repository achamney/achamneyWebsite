package org.gravity.window;

import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;

import org.gravity.adapter.ActionListener;
import org.gravity.adapter.Adapter;
import org.gravity.adapter.Button;
import org.gravity.adapter.Color;


public class MainWindow implements Window
{
	List<Button> buttonList;
	Windows curWindow;
	ActionListener changeWindowListener;
	int width, height;

	public MainWindow(Adapter a, int width, int height)
	{
		this.width = width;
		this.height = height;
		buttonList = new ArrayList<Button>();
		Button b = new Button(a, 100, 300, 90, 30, "Level Select");
		b.addActionListener(new ActionListener()
		{

			@Override
			public void actionPerformed()
			{
				curWindow = Window.Windows.LEVELSELECT;
				changeWindowListener.actionPerformed();
			}
		});
		buttonList.add(b);
		b = new Button(a, 200, 300, 60, 30, "Exit");
		b.addActionListener(new ActionListener()
		{

			@Override
			public void actionPerformed()
			{
				System.exit(0);
			}
		});
		buttonList.add(b);
		b = new Button(a, 300, 300, 100, 30, "Level Builder");
		b.addActionListener(new ActionListener()
		{

			@Override
			public void actionPerformed()
			{
				curWindow = Window.Windows.LEVELBUILDER;
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
