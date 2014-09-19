package org.gravity.adapter;

import java.applet.Applet;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

public class Button implements MouseListener
{
	protected int width;
	protected int height;
	protected int x;
	protected int y;
	protected boolean selected;
	protected boolean active = false;
	protected Applet parent;
	protected String text;
	protected String subText;
	protected static Font butFont = new Font("Arial", 0, 14);
	protected ActionListener al;
	protected int yTextOffset;
	protected boolean visible = true;

	public Button(Adapter parent, int x, int y, int width, int height,
			String text)
	{
		this.height = height;
		this.x = x;
		this.width = width;
		this.y = y;
		this.yTextOffset = 20;
		this.text = text;
		al = new ActionListener()
		{
			@Override
			public void actionPerformed()
			{
				// TODO Auto-generated method stub

			}
		};
		parent.addMouseListener(this);
	}

	public void draw(Adapter offg, Point p)
	{
		if (visible && active)
		{
			offg.drawRect(x + p.x, y + p.y, width, height, Color.fromArgb(0, 0, 255));
			if (selected)
			{
				// offg.setColor(new Color(0, 0, 200));
				offg.fillRect(x + 1 + p.x, y + 1 + p.y, width - 1, height - 1,
						Color.fromArgb(0, 0, 200));
			} else
			{
				// offg.setColor(new Color(0, 0, 100));
				offg.fillRect(x + 1 + p.x, y + 1 + p.y, width - 1, height - 1,
						Color.fromArgb(0, 0, 100));
			}
			offg.drawText("" + text, x + 10 + p.x, y + yTextOffset + p.y,
					Color.fromArgb(255, 255, 255));
			if (subText != null)
				offg.drawText("" + subText, x + 10 + p.x, y + 40 + p.y,
						Color.fromArgb(255, 255, 255));
			// offg.setFont(tempFont);
		}
	}

	public void draw(Adapter offg)
	{
		this.draw(offg, new Point(0, 0));

	}

	public void addActionListener(ActionListener al)
	{
		this.al = al;
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
		// TODO Auto-generated method stub
		if (visible && active)
		{
			selected = false;
			if (e.getX() > x && e.getX() < x + width)
				if (e.getY() > y && e.getY() < y + height)
				{
					selected = true;
					al.actionPerformed();
				}
		}
	}

	@Override
	public void mouseReleased(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	public boolean getSelected()
	{
		return selected;
	}

	public void setSelected(boolean sel)
	{
		selected = sel;
	}

	public String getText()
	{
		return text;
	}

	public void setSubText(String text)
	{
		this.subText = text;
	}

	public void setText(String text)
	{
		this.text = text;
	}

	public void setVisible(boolean visible)
	{
		this.visible = visible;
	}

	public boolean isActive()
	{
		return active;
	}

	public void setActive(boolean active)
	{
		this.active = active;
	}
	
}
