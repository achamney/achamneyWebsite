package org.gravity.game;

import org.gravity.adapter.Adapter;
import org.gravity.adapter.Button;
import org.gravity.adapter.Point;

public class MenuItem
{
	Button button;

	public MenuItem(Adapter parent, String text, int x)
	{
		button = new Button(parent, x, 0, 90, 35, text);
	}

	public void draw(Adapter adapter, Point in)
	{
		// if (visible)
		button.draw(adapter, new Point(in.x, in.y));
	}

	public void setVisible(boolean visible)
	{
		button.setVisible(visible);
	}
}
