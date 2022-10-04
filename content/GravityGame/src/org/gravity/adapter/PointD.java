package org.gravity.adapter;

public class PointD
{
	public double x,y;
	public PointD()
	{
		
	}
	public PointD(double x, double y)
	{
		this.x = x;
		this.y = y;
	}
	public static double distance(double x2, double y2)
	{
		return Math.sqrt(x2*x2 + y2*y2);
	}
}
