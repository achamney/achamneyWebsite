import java.awt.Color;
import java.awt.Graphics;

public class GameObject
{
	PointF position;
	PointF speed;
	Color c;

	public GameObject(PointF pos)
	{
		position = pos;
		speed = new PointF(0, 0);
	}

	public void update()
	{

	}

	public void draw(Graphics offg)
	{

	}
	

}
