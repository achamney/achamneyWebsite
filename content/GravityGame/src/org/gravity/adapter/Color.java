package org.gravity.adapter;

public class Color extends java.awt.Color
{
	/**
	 * 
	 */
	private static float factor = 1.0f/255.0f;
	private static final long serialVersionUID = 1L;
	public static Color black = new Color(0,0,0);
	public static Color white = new Color(1,1,1);

	public Color()
	{
		super(0);
	}
	public Color(float r, float g, float b)
	{
		super(r,g,b);

	}
	public static Color fromArgb(float r, float g, float b)
	{
		return new Color(r*factor,g*factor,b*factor);
	}
}
