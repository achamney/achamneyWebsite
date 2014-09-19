package org.gravity.game.objects;

import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.Point;
import org.gravity.adapter.PointF;

public class DirectionArrow
{
	private static final float PI = 3.14159f;
	Point position;
	boolean active;
	float angle;
	Point end;

	public DirectionArrow()
	{
		this.position = new Point();
		end = new Point();
	}

	public void update(Point mousePos)
	{
		angle = (float) (Math.atan2(position.y - mousePos.y, position.x
				- mousePos.x));
		end = new Point(mousePos.x, mousePos.y);
	}

	public void draw(Adapter g)
	{
		if (active)
		{
			Point diff = new Point(position.x - end.x, position.y - end.y);
			float max = 100;
			float mag = PointF.distance(diff.x, diff.y);
			if (mag > max)
			{
				diff.x *= max / mag;
				diff.y *= max / mag;
			}
			g.drawLine(position.x, position.y, position.x + diff.x, position.y
					+ diff.y, Color.black);
			g.drawLine(
					position.x + diff.x,
					position.y + diff.y,
					position.x + diff.x - (int) (Math.cos(angle - PI / 8) * 10),
					position.y + diff.y - (int) (Math.sin(angle - PI / 8) * 10),
					Color.black);
			g.drawLine(
					position.x + diff.x,
					position.y + diff.y,
					position.x + diff.x - (int) (Math.cos(angle + PI / 8) * 10),
					position.y + diff.y - (int) (Math.sin(angle + PI / 8) * 10),
					Color.black);
		}
	}

	public void setPosition(PointF pos)
	{
		this.position = new Point((int) pos.x, (int) pos.y);
		this.end = new Point((int) pos.x, (int) pos.y);
		active = true;
	}

	public void fire()
	{
		active = false;
	}
}
