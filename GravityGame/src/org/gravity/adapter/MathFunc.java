package org.gravity.adapter;

public class MathFunc
{
	public static float clamp01(float in)
	{
		if (in > 1)
			return 1;
		else if (in < 0)
			return 0;
		return in;
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

	public static float dot(PointF in1, PointF in2)
	{
		return in1.x * in2.x + in1.y * in2.y;
	}

	public static PointD normalize(PointD in)
	{
		double mag = (Math.sqrt(in.x * in.x + in.y * in.y));
		return new PointD(in.x / mag, in.y / mag);
	}

	public static double dot(PointF in1, PointD in2)
	{
		// TODO Auto-generated method stub
		return (in1.x * in2.x + in1.y * in2.y);
	}
}
