package org.gravity.adapter;

public class PointF
{
	public float x;
	public float y;

	public PointF()
	{
		x = 0;
		y = 0;
	}

	public PointF(float x, float y)
	{
		this.x = x;
		this.y = y;
	}

	public static float distance(float x, float y)
	{
		return (float) (Math.sqrt(x * x + y * y));
	}

	public static PointF normalize(PointF in)
	{
		float mag = (float) (Math.sqrt(in.x * in.x + in.y * in.y));
		return new PointF(in.x / mag, in.y / mag);
	}

}
