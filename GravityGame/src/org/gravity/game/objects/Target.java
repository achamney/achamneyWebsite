package org.gravity.game.objects;

import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.PointF;
import org.gravity.adapter.Rect;

public class Target
{
	PointF position;
	int radius = 15;
	int rimWidth = 2;

	public Target(PointF position)
	{
		this.position = position;
	}

	public void draw(Adapter a)
	{
		a.fillOval(new Rect((int) position.x - radius, (int) position.y
				- radius, radius * 2, radius * 2), Color.black);
		a.fillOval(new Rect((int) position.x - radius + rimWidth,
				(int) position.y - radius + rimWidth,
				radius * 2 - rimWidth * 2, radius * 2 - rimWidth * 2), Color
				.fromArgb(0, 255, 0));
	}

	public boolean collide(Ball b)
	{
		if (PointF.distance(b.position.x - position.x, b.position.y
				- position.y) < radius + b.radius)
		{
			return true;
		}
		return false;
	}
}
