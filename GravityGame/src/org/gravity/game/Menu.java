package org.gravity.game;

import java.util.ArrayList;
import java.util.List;

import org.gravity.adapter.ActionListener;
import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.Point;


public class Menu
{
	List<MenuItem> items;
	Point position;
	Point border;
	Point size;
	Adapter parent;
	int left = 10;

	public Menu(Adapter parent)
	{
		this.parent = parent;
		position = new Point();
		size = new Point(800, 40);
		border = new Point(4, 3);
		items = new ArrayList<MenuItem>();

	}

	public void draw(Adapter a)
	{
		a.fillRect(position.x, position.y, size.x, size.y,Color.fromArgb(150, 150, 255));
		a.fillRect(position.x + border.x, position.y + border.y, size.x
				- border.x * 2, size.y - border.y * 2, Color.fromArgb(200, 200, 255));
		for (MenuItem item : items)
		{
			item.draw(a, new Point(position.x, position.y));
		}
	}

	public void addItem(String text, ActionListener al)
	{
		MenuItem item = new MenuItem(parent, text, left);
		item.button.addActionListener(al);
		items.add(item);
		left += 90;
	}

	public MenuItem getMenuItem(String text)
	{
		for (MenuItem item : items)
		{
			if (item.button.getText().equals(text))
				return item;
		}
		return null;

	}

	public boolean isInside(Point point)
	{
		if (position.x < point.x)
			if (position.x + size.x > point.x)
				if (position.y < point.y)
					if (position.y + size.y > point.y)
						return true;
		return false;
	}
	public void deactivateButtons()
	{
		for (MenuItem item : items)
		{
			item.button.setActive(false);
		}
	}
	public void activateButtons()
	{
		for (MenuItem item : items)
		{
			item.button.setActive(true);
		}
	}
}