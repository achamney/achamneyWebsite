package org.gravity.game.objects;


import org.gravity.adapter.ActionListener;
import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.PointD;
import org.gravity.adapter.PointF;
import org.gravity.adapter.Rect;

public class Ball
{
	PointF position;
	PointD velocity;
	int width = 10;
	int radius =5;
	boolean active;
	boolean win;
	ActionListener winListener;

	public Ball(PointF position)
	{
		this.position = position;
		velocity = new PointD();
	}

	public void draw(Adapter a)
	{
		a.fillOval((int) position.x - radius, (int) position.y - radius, width,
				width, Color.fromArgb(255, 0, 0));
		// a.fillOval((int) position.x-1, (int) position.y-1, 2, 2, Color.blue);
	}

	public PointF getPosition()
	{
		return position;
	}

	public void updateTrajectory(float[] heights, int maskSize)
	{
		float squMask = (int) Math.sqrt(maskSize);
		for (int i = 0; i < maskSize; i++)
		{
			if (heights[i] > heights[maskSize / 2])
			{
				velocity.x += (1 - i % squMask)
						* (heights[i] - heights[maskSize / 2]) / (maskSize * 2);
				velocity.y += (1 - i / (int) squMask)
						* (heights[i] - heights[maskSize / 2]) / (maskSize * 2);
			} else if (heights[i] < heights[maskSize / 2])
			{
				velocity.x -= (1 - i % squMask)
						* (heights[maskSize / 2] - heights[i]) / (maskSize * 2);
				velocity.y -= (1 - i / (int) squMask)
						* (heights[maskSize / 2] - heights[i]) / (maskSize * 2);
			}
		}
	}

	public PointD getVelocity()
	{
		return velocity;
	}

	public void setVelocity(double f, double g)
	{
		this.velocity.x = f;
		this.velocity.y = g;
	}

	public boolean collideBox(Rect rect)
	{
		PointD tempPos = new PointD(position.x + velocity.x, position.y
				+ velocity.y);
		if (tempPos.x - radius < rect.x + rect.width)
			if (tempPos.x + radius > rect.x)
				if (tempPos.y - radius < rect.y + rect.height)
					if (tempPos.y + radius > rect.y)
					{
						// velocity.x/=1.7f;
						// velocity.y/=1.7f;
						return true;
					}
		if (position.x - radius < rect.x + rect.width)
			if (position.x + radius > rect.x)
				if (position.y - radius < rect.y + rect.height)
					if (position.y + radius > rect.y)
						return true;
		return false;
	}

	public void setPosition(float f, float g)
	{
		position.x = f;
		position.y = g;
	}
	public void updateVelocity(double x, double y)
	{
		velocity.x += x;
		velocity.y += y;
	}
	public void update()
	{
		if (active)
		{
			position.x += velocity.x;
			position.y += velocity.y;
			velocity.x *= 0.999;
			velocity.y *= 0.999;
		}
	}

	public void fire(PointF mouse)
	{
		active = true;

		PointF vector = new PointF(mouse.x - position.x, mouse.y - position.y);
		float max = 100;
		float mag = PointF.distance(vector.x, vector.y);
		if (mag > max)
		{
			vector.x *= max / mag;
			vector.y *= max / mag;
		}
		velocity.x = -(vector.x) / 15.0f;
		velocity.y = -(vector.y) / 15.0f;
	}

	public void setActive(boolean b)
	{
		active = b;
	}

	public void setWin(boolean b)
	{
		win = b;
		winListener.actionPerformed();
	}

	public void setWinListener(ActionListener winListener)
	{
		this.winListener = winListener;
	}
	public void reset()
	{
		active = false;
	}

	public boolean getActive()
	{
		return active;
	}
}
