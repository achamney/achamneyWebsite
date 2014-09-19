package org.gravity.game.objects;

import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.MathFunc;
import org.gravity.adapter.PointF;
import org.gravity.adapter.Rect;
import org.gravity.game.GameBoard;


public class SinkHole implements Obsticle
{
	Rect rect;
	float std;
	float depth;
	boolean selected;
	GameBoard gameBoard;

	public SinkHole(Rect rect, float depth, float std)
	{
		this.rect = rect;
		this.std = std;
		this.depth = depth;
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

	@Override
	public void update()
	{

	}

	public Rect getRect()
	{
		return rect;
	}

	public float getDepth()
	{
		return depth;
	}

	public float getStd()
	{
		return std;
	}

	public void setSelected(boolean sel)
	{
		this.selected = sel;
	}

	@Override
	public void draw(Adapter a)
	{
		int size = 2;
		Color color = Color.fromArgb(255, 255, 0);
		if (selected)
			color = Color.fromArgb(255, 0, 0);

		a.fillOval(new Rect(rect.x, rect.y, rect.width, rect.height),
				Color.fromArgb(125, 255, 200));
		a.drawOval(new Rect(rect.width / 2 - size + rect.x, rect.height / 2
				- size + rect.y, size * 4, size * 4), color);
	}

	@Override
	public void collide(Ball b)
	{
		PointF difference = new PointF(rect.x + rect.width / 2 - b.position.x,
				rect.y + rect.height / 2 - b.position.y);
		float dist= PointF.distance(difference.x, difference.y);
		if(dist < 3)
		{
			b.setVelocity(b.getVelocity().x*0.99f, b.getVelocity().y*0.99f);
		}
		else if(dist< rect.width / 2)
		{
			difference = MathFunc.normalize(difference);
			difference.x *= (depth*dist)*(1.0/3000.0);
			difference.y *= (depth*dist)*(1.0/3000.0);
			b.updateVelocity(difference.x, difference.y);
		}
	}

	public void setDepth(Float depth)
	{
		this.depth = depth;
	}

	public void setWidth(Float depth)
	{
		this.rect.width = (int) depth.floatValue();
	}

	public void setHeight(Float depth)
	{
		this.rect.height = (int) depth.floatValue();
	}

	public void setX(Float depth)
	{
		this.rect.x = (int) depth.floatValue();
	}

	public void setY(Float depth)
	{
		this.rect.y = (int) depth.floatValue();
	}

	public void setStd(Float depth)
	{
		this.std = depth;
	}

	public void setGameBoard(GameBoard gameBoard)
	{
		this.gameBoard = gameBoard;
	}

	@Override
	public int compareTo(Obsticle o)
	{
		if(o instanceof Wall)
			return -1;
		if(o instanceof Hole)
			return -1;
		if(o instanceof Gradient)
			return 1;
		return 0;
	}

}
