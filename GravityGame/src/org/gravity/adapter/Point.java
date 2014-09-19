package org.gravity.adapter;

public class Point
{
	public int x;
	public int y;

	public Point()
	{
		x = 0;
		y = 0;
	}

	public Point(int x, int y)
	{
		this.x = x;
		this.y = y;
	}

	public Point(float x, float y)
	{
		this.x = (int) x;
		this.y = (int) y;
	}
}
