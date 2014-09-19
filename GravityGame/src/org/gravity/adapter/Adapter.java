package org.gravity.adapter;

import java.awt.Image;
import java.awt.event.MouseListener;

public interface Adapter
{
	public void fillRect(int x, int y, int width, int height, Color col);

	public void fillOval(int x, int y, int width, int height, Color col);

	public void drawImage(Image b, int x, int y);

	public void drawRect(int x, int y, int width, int height, Color col);

	public void drawLine(int x, int y, int x1, int y1, Color col);

	public void drawText(String string, int x, int y, Color col);

	public void drawOval(Rect rect, Color col);

	public void fillOval(Rect rect, Color green);
	
	public void addMouseListener(MouseListener ml);
}
