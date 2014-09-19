package org.gravity.game.objects;

import org.gravity.adapter.Adapter;
import org.gravity.adapter.PointF;
import org.gravity.adapter.Rect;
import org.gravity.game.GameBoard;


public class Gradient implements Obsticle
{
	float angle;
	float depth;
	boolean direction;
	GameBoard gameBoard;
	boolean selected;
	int position;

	enum Moving {NEGTHIRTY,NEGFIFTEEN, ZERO,FIFTEEN, THIRTY};
	Moving moveVal;
	
	public Gradient(float angle, float depth)
	{
		this.depth = depth;
		this.angle = angle;
		moveVal = Moving.THIRTY;
	}

	
	@Override
	public boolean select(int x, int y)
	{
		selected = false;

		if (PointF.distance(x, y) < 100)
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
		return new Rect(0, 0, GameBoard.width, GameBoard.height);
	}

	public float getDepth()
	{
		return depth;
	}

	public float getAngle()
	{
		return angle;
	}
	
	public void setSelected(boolean sel)
	{
		this.selected = sel;
	}

	@Override
	public void draw(Adapter a)
	{
		
	}

	public void setGameBoard(GameBoard gameBoard)
	{
		this.gameBoard = gameBoard;
	}

	public void setAngle(Float angle)
	{
		this.angle = angle;
	}

	public void setDepth(Float depth)
	{
		this.depth = depth;
	}

	@Override
	public void collide(Ball b)
	{
		PointF vector = new PointF();
		vector.x = (float)(Math.cos(angle))*(moveVal.ordinal()-2)*0.1f;
		vector.y = (float)(Math.sin(angle))*(moveVal.ordinal()-2)*0.1f;
		b.updateVelocity(vector.x, vector.y);
	}


	@Override
	public int compareTo(Obsticle obs)
	{
		return -1;
	}

}
