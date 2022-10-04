import java.awt.Color;
import java.awt.GradientPaint;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.util.ArrayList;

public class Amoeba extends GameObject
{
	ArrayList<Electron> electrons = new ArrayList<Electron>();
	int growthTime;
	int size;
	int growthTimeMax;
	boolean selected;
	Player parent;
	int randAttackNum;
	int animation;
	int animationDelay;
	int health;

	public Amoeba(PointF pos, Player parent, boolean active)
	{
		super(pos);
		health = 1;
		this.parent = parent;
		if (active)
			growthTimeMax = 100;
		else
			growthTimeMax = 1000;
		size = 30;
	}

	public void draw(Graphics offg)
	{
		offg.setColor(parent.color);
		offg.drawString("" + electrons.size(), (int) position.x - size / 2,
				(int) position.y - size / 2);
		Graphics2D g2d = (Graphics2D) offg;
		GradientPaint gradient = new GradientPaint((int) position.x,
				(int) position.y - size / 2 + animation, parent.color.darker()
						.darker().darker(), (int) position.x, (int) position.y
						+ size / 2 + animation, parent.color, true);

		g2d.setPaint(gradient);
		g2d.fillOval((int) position.x - size / 2, (int) position.y - size / 2,
				size, size);
		g2d.setPaint(null);
		if (selected)
			offg.setColor(Color.white);
		offg.drawOval((int) position.x - size / 2, (int) position.y - size / 2,
				size, size);
		for (Electron e : electrons)
		{
			e.draw(offg);
		}
	}

	public void update()
	{
		if (animationDelay <= 0)
		{
			animationDelay = (int) (Math.random() * 5 + 3);
			animation++;
		} else
		{
			animationDelay--;
		}

		size = 30 + electrons.size();
		for (Electron e : electrons)
		{
			e.update();
		}
		speed.x *= 0.95f;
		speed.y *= 0.95f;
		position.x += speed.x;
		position.y += speed.y;
	}

	public void generate()
	{
		if (growthTime <= 0)
		{
			electrons
					.add(new Electron(new PointF(position.x, position.y), this));
			growthTime = growthTimeMax;
		} else
		{
			growthTime--;
		}
	}

	public boolean isInside(int x, int y)
	{
		if (x > position.x - size / 2)
			if (x < position.x + size / 2)
				if (y > position.y - size / 2)
					if (y < position.y + size / 2)
						return true;
		return false;
	}

	public void attack(int x, int y)
	{
		float angle = (float) (Math.atan2(y - position.y, x - position.x));
		speed.x += (float) (Math.cos(angle) * electrons.size() * 0.25);
		speed.y += (float) (Math.sin(angle) * electrons.size() * 0.25);
		for (Electron e : electrons)
		{
			e.state = Electron.States.ATTACKING;
			e.destination = new PointF(x, y);
		}
	}
}
