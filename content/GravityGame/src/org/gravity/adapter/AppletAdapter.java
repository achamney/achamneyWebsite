package org.gravity.adapter;

import java.applet.Applet;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.MouseListener;

public class AppletAdapter implements Adapter
{
	Graphics offg;
	Applet parent;

	public AppletAdapter(Applet parent, Graphics offg)
	{
		this.offg = offg;
		this.parent = parent;
	}

	@Override
	public void fillRect(int x, int y, int width, int height, Color c)
	{
		offg.setColor(c);
		offg.fillRect(x, y, width, height);
	}

	@Override
	public void fillOval(int x, int y, int width, int height, Color c)
	{
		offg.setColor(c);
		offg.fillOval(x, y, width, height);
	}

	@Override
	public void fillOval(Rect rect, Color c)
	{
		offg.setColor(c);
		offg.fillOval(rect.x, rect.y, rect.width, rect.height);
	}

	@Override
	public void drawImage(Image b, int x, int y)
	{
		offg.drawImage(b, x, y, null);
	}

	@Override
	public void drawRect(int x, int y, int width, int height, Color col)
	{
		offg.setColor(col);
		offg.drawRect(x, y, width, height);
	}

	@Override
	public void drawLine(int x, int y, int x1, int y1, Color col)
	{
		offg.setColor(col);
		offg.drawLine(x, y, x1, y1);
	}

	@Override
	public void drawText(String string, int x, int y, Color col)
	{
		offg.setColor(col);
		offg.drawString(string, x, y);
	}

	@Override
	public void drawOval(Rect rect, Color col)
	{
		offg.setColor(col);
		offg.drawOval(rect.x, rect.y, rect.width, rect.height);
	}

	@Override
	public void addMouseListener(MouseListener ml)
	{
		parent.addMouseListener(ml);
	}

}
