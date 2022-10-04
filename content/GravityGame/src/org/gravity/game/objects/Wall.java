package org.gravity.game.objects;


import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.PointD;
import org.gravity.adapter.PointF;
import org.gravity.adapter.Rect;

public class Wall implements Obsticle
{
	Rect rect;
	boolean selected;

	public Wall(Rect rect)
	{
		this.rect = rect;
	}

	@Override
	public void update()
	{

	}

	@Override
	public void draw(Adapter a)
	{
		if (selected)
			a.fillRect(rect.x - 2, rect.y - 2, rect.width + 4, rect.height + 4,
					Color.fromArgb(255, 0, 0));
		a.fillRect(rect.x, rect.y, rect.width, rect.height, Color.white);
	}

	@Override
	public void collide(Ball b)
	{
		if (b.collideBox(rect))
		{
			PointD vel = b.getVelocity();
			PointF closestPoint = closestPoint(b.getPosition());
			PointF norm = findNormal(closestPoint);
			// float angle = MathFunc.dot(norm, MathFunc.normalize(vel));
			b.setPosition(closestPoint.x, +closestPoint.y);
			double oldSpeed = PointD.distance(b.velocity.x, b.velocity.y);
			b.setVelocity(vel.x + (Math.abs(vel.x) * norm.x * 2),
					vel.y + (Math.abs(vel.y) * norm.y * 2));
			double ratio = PointD.distance(b.velocity.x, b.velocity.y)
					/ oldSpeed;
			if (ratio != 1)
				b.setVelocity(vel.x / ratio, vel.y / ratio);
			if (oldSpeed < 0.5f)
			{
				b.setVelocity(0, 0);
			}
		}
	}

	public PointF closestPoint(PointF target)
	{
		PointF point = new PointF(target.x, target.y);
		if (target.x > rect.x + rect.width)
			target.x = rect.x + rect.width;
		else if (target.x < rect.x)
			target.x = rect.x;
		if (target.y > rect.y + rect.height)
			target.y = rect.y + rect.height;
		else if (target.y < rect.y)
			target.y = rect.y;
		return point;
	}

	public PointF findNormal(PointF closePoint)
	{
		// /SIDES
		int box = 5;
		PointF normal = new PointF(0, 0);
		if (closePoint.x > rect.x + rect.width - box)
			normal = new PointF(1, 0);
		else if (closePoint.x < rect.x + box)
			normal = new PointF(-1, 0);
		if (closePoint.y > rect.y + rect.height - box)
			normal = new PointF(0, 1);
		else if (closePoint.y < rect.y + box)
			normal = new PointF(0, -1);

		// /CORNERS

		if (closePoint.x == rect.x + rect.width
				&& closePoint.y == rect.y + rect.height)
			return PointF.normalize(new PointF(1, 1));
		if (closePoint.x == rect.x && closePoint.y == rect.y + rect.height)
			return PointF.normalize(new PointF(-1, 1));
		if (closePoint.x == rect.x + rect.width && closePoint.y == rect.y)
			return PointF.normalize(new PointF(1, -1));
		if (closePoint.x == rect.x && closePoint.y == rect.y)
			return PointF.normalize(new PointF(-1, -1));

		return normal;
	}

	@Override
	public boolean select(int x, int y)
	{
		selected = false;
		if (x > rect.x && x < rect.x + rect.width)
			if (y > rect.y && y < rect.y + rect.height)
			{
				selected = true;
				return true;
			}
		return false;
	}

	public Rect getRect()
	{

		return rect;
	}


	public void setSelected(boolean sel)
	{
		this.selected = sel;
	}

	@Override
	public int compareTo(Obsticle o)
	{
		return 1;
	}

}
