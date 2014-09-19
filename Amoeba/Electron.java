import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;

public class Electron extends GameObject
{
	int size;
	Amoeba parent;
	public int state;
	PointF destination;
	int health;

	public interface States
	{
		final int NEUTRAL = 0;
		final int ATTACKING = 1;
	}

	Electron(PointF pos, Amoeba parent)
	{
		super(pos);
		health = 1;
		destination = new PointF();
		this.parent = parent;
		position.x += Math.random() * 10 - 5;
		position.y += Math.random() * 10 - 5;
		speed = new PointF((float) Math.random() * 0.5f - 0.25f,
				(float) (Math.random() * 0.5f - 0.25f));
		size = 5;
	}

	public void draw(Graphics offg)
	{
		offg.setColor(Color.green);
		offg.drawOval((int) position.x - size / 2, (int) position.y - size / 2,
				size, size);
	}

	public void update()
	{
		float angle=0;
		if (state == States.NEUTRAL)
		{
			angle = (float) (Math.atan2(parent.position.y - position.y,
					parent.position.x - position.x))
					+ (float) Math.random()
					* 0.1f;
			if (Point.distance(position.x, position.y, parent.position.x,
					parent.position.y) > parent.size / 2)
			{
				angle = (float) (Math.atan2(parent.position.y - position.y,
						parent.position.x - position.x));
				speed.x *= 0.9;
				speed.y *= 0.9;
			}
		}
		else
		{
			angle = (float) (Math.atan2(destination.y - position.y,
					destination.x - position.x));
		}
		speed.x += (float) (Math.cos(angle) * 0.17);
		speed.y += (float) (Math.sin(angle) * 0.17);
		
		position.x += speed.x;
		position.y += speed.y;

	}
}
