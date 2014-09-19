package org.gravity.game.objects;

import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.MathFunc;
import org.gravity.adapter.PointD;
import org.gravity.adapter.PointF;
import org.gravity.adapter.Rect;

public class Hole implements Obsticle
{
	Rect rect;
	PointF closePoint;
	boolean selected;

	public Hole(Rect rect)
	{
		this.rect = rect;
		closePoint = new PointF();
	}

	@Override
	public void update()
	{

	}

	@Override
	public void draw(Adapter a)
	{
		if (selected)
			a.fillOval(rect.x - 2, rect.y - 2, rect.width + 4, rect.height + 4,
					Color.fromArgb(255, 0, 0));
		a.fillOval(rect.x, rect.y, rect.width, rect.height, Color.black);

	}

	@Override
	public void collide(Ball b)
	{
		PointD vel = b.getVelocity();
		PointF closestPoint = closestPoint(b);
		closePoint = closestPoint;
		PointF norm = findNormal(closestPoint);
		PointF vectorFromBallToClosePoint = new PointF(b.position.x
				- closestPoint.x, b.position.y - closestPoint.y);
		float collisionSize = (float) 10;
		if (PointF.distance(vectorFromBallToClosePoint.x,
				vectorFromBallToClosePoint.y) < collisionSize && b.width < rect.width)
		{
			if (MathFunc.dot(norm, MathFunc.normalize(b.getVelocity())) < 0)
			{
				// b.setPosition(closestPoint.x, +closestPoint.y);
				b.setVelocity(vel.x + (Math.abs(vel.x) * norm.x * 2f), vel.y
						+ (Math.abs(vel.y) * norm.y * 2f));
				if (PointD.distance(b.getVelocity().x, b.getVelocity().y) < 0.3)
					b.setVelocity(0, 0);
			}
		}
	}

	@Override
	public boolean select(int x, int y)
	{
		selected = false;
		PointF vectorFromCenter = new PointF(rect.x + rect.width / 2 - x,
				rect.y + rect.height / 2 - y);
		if (PointF.distance(vectorFromCenter.x, vectorFromCenter.y) < rect.width / 2)
		{
			selected = true;
			return true;
		}
		return false;
	}

	public PointF closestPoint(Ball b)
	{
		PointF target = new PointF(b.position.x + (float)b.velocity.x, b.position.y
				+ (float)b.velocity.y);
		PointF middle = new PointF(rect.x + rect.width / 2, rect.y
				+ rect.height / 2);
		PointF vector = new PointF(target.x - middle.x, target.y - middle.y);
		float mag = PointF.distance(vector.x, vector.y);

		vector.x *= (rect.width / 2) / mag;
		vector.y *= (rect.width / 2) / mag;

		return new PointF(middle.x + vector.x, middle.y + vector.y);
	}

	public PointF findNormal(PointF closePoint)
	{
		PointF normal = PointF.normalize(new PointF(rect.x + rect.width / 2
				- closePoint.x, rect.y + rect.height / 2 - closePoint.y));
		return normal;
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
		if (o instanceof Wall)
			return -1;
		if (o instanceof SinkHole)
			return 1;
		if (o instanceof Gradient)
			return 1;
		return 0;
	}

}
