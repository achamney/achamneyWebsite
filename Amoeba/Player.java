import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class Player
{
	public interface States
	{
		final int EXPAND = 0;
		final int ATTACK = 1;
	}

	PointF position;
	ArrayList<Amoeba> amebas = new ArrayList<Amoeba>();
	Color color;
	boolean active;
	int randomizeAttacks;
	int attackTimeCooeficent = 200;
	int state;
	int timeTillNextAttack;
	boolean computer;

	public Player(Color c, boolean active, boolean computer)
	{
		color = c;
		position = new PointF((float) Math.random() * 9500,
				(float) Math.random() * 600);
		amebas.add(new Amoeba(new PointF((float) Math.random() * 1000,
				(float) Math.random() * 600), this, active));
		this.active = active;
		if (!active)
		{
			for (int i = 0; i < 15; i++)
			{
				amebas.add(new Amoeba(new PointF((float) Math.random() * 1000,
						(float) Math.random() * 600), this, active));
			}
		}
		this.computer = computer;
	}

	public void draw(Graphics offg)
	{
		for (Amoeba a : amebas)
		{
			a.draw(offg);
		}
	}

	public void update()
	{
		for (Amoeba a : amebas)
		{
			a.update();
			a.generate();
		}
		for (Amoeba a : amebas)
		{

			for (Amoeba otherA : amebas)
			{
				for (int i = 0; i < a.electrons.size(); i++)
				{
					Electron e = a.electrons.get(i);
					if (e.state == Electron.States.ATTACKING)
					{
						if (!otherA.equals(a)
								&& otherA.isInside((int) e.position.x,
										(int) e.position.y))
						{
							PointF saveEPos = new PointF(e.position.x,
									e.position.y);
							PointF saveESpeed = new PointF(e.speed.x, e.speed.y);
							a.electrons.remove(i);
							Electron newE = new Electron(saveEPos, otherA);
							otherA.electrons.add(newE);
							newE.speed = saveESpeed;
						}
					}
				}
			}
		}
		collideAmoebas();

	}

	public void mousePressed(MouseEvent event)
	{
		if (event.getButton() == MouseEvent.BUTTON1)
		{
			for (Amoeba a : amebas)
			{
				if (a.isInside(event.getX(), event.getY()))
				{
					a.selected = true;
				} else
				{
					a.selected = false;
				}
			}
		}
		if (event.getButton() == MouseEvent.BUTTON3)
		{
			for (Amoeba a : amebas)
			{
				if (a.selected)
				{
					a.attack(event.getX(), event.getY());
				}
			}
		}
	}

	public void ai(Player neutral, Player enemy)
	{
		if (randomizeAttacks <= 0)
		{
			randomizeAttacks = 300;
			for (Amoeba a : amebas)
			{
				a.randAttackNum = (int) Math.random() * 10 + 3;
			}
		} else
		{
			randomizeAttacks--;
		}
		if (timeTillNextAttack > 0)
		{
			timeTillNextAttack--;
		}
		if (state == States.EXPAND)
		{
			for (Amoeba a : amebas)
			{
				if (a.electrons.size() > a.randAttackNum
						&& timeTillNextAttack <= 0)
				{
					int tempDist = Integer.MAX_VALUE;
					timeTillNextAttack = a.electrons.size()
							* attackTimeCooeficent;
					PointF attackPos = new PointF();
					for (Amoeba neu : neutral.amebas)
					{
						double newDist = Point.distance((int) neu.position.x,
								(int) neu.position.y, (int) a.position.x,
								(int) a.position.y);
						if (newDist < tempDist)
						{
							tempDist = (int) newDist;
							attackPos = neu.position;
						}
					}
					if (neutral.amebas.size() == 0)
					{
						state = States.ATTACK;
					}
					a.attack((int) attackPos.x, (int) attackPos.y);
				}
			}
		}
		if (state == States.ATTACK)
		{
			for (Amoeba a : amebas)
			{

				int tempDist = Integer.MAX_VALUE;
				PointF attackPos = new PointF();
				if (timeTillNextAttack <= 0)
				{
					for (Amoeba neu : enemy.amebas)
					{

						double newDist = Point.distance((int) neu.position.x,
								(int) neu.position.y, (int) a.position.x,
								(int) a.position.y);
						if (newDist < tempDist
								&& a.electrons.size() > neu.electrons.size()
										+ a.randAttackNum)

						{
							tempDist = (int) newDist;
							attackPos = neu.position;
						}
					}
				}
				if (attackPos.x != 0 || attackPos.y != 0)
				{
					a.attack((int) attackPos.x, (int) attackPos.y);
					timeTillNextAttack = a.electrons.size()
							* attackTimeCooeficent;
				}

			}
		}
	}

	public void collideAmoebas()
	{
		for (Amoeba p1a : amebas)
		{
			for (Amoeba p2a : amebas)
			{
				if (!p1a.equals(p2a))
				{
					float distance = (float) Point.distance(p1a.position.x,
							p1a.position.y, p2a.position.x, p2a.position.y);
					if (distance < p1a.size / 2 + p2a.size / 2)
					{
						float angle = (float) Math.atan2(p1a.position.y
								- p2a.position.y, p1a.position.x
								- p2a.position.x);
						p1a.speed.x = (float) (Math.cos(angle) * 1);
						p1a.speed.y = (float) (Math.sin(angle) * 1);
						p2a.speed.x = (float) (Math.cos(angle + 3.141) * 1);
						p2a.speed.y = (float) (Math.sin(angle + 3.141) * 1);
					}
				}
			}
		}
	}
}
