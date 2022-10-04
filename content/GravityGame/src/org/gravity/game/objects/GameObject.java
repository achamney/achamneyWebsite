package org.gravity.game.objects;

public interface GameObject
{

	public boolean select(int x, int y);
	
	public void update();
	
	public void setSelected(boolean sel);
}
