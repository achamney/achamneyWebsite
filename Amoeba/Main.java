import java.applet.Applet;
import java.awt.AWTException;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Point;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import java.util.ArrayList;

import javax.swing.Timer;
import java.security.*;

public class Main extends Applet implements ActionListener, MouseListener
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	Graphics offg;
	Image offscreen;
	Timer timer1;
	Player player1;
	Player neutral;
	Image youwin;
	Image youlose;
	Player comp;
	Font winFont;
	Font numFont;
	Background background;

	@SuppressWarnings("unchecked")
	public void init()
	{
		offscreen = this.createImage(1500, 1000);
		this.addMouseListener(this);
		winFont = new Font("arial", 0, 50);
		numFont = new Font("arial", 0, 14);
		youwin = getImage(getDocumentBase(), "youwin.gif");
		youlose = getImage(getDocumentBase(), "youlose.gif");
		setSize(1000, 600);
		timer1 = new Timer(30, this);
		timer1.start();
		startGame();
		offg = offscreen.getGraphics();
	}

	public void paint(Graphics g)
	{
		offg.setColor(Color.black);
		offg.fillRect(0, 0, 1000, 600);

		offg.setFont(numFont);
		drawPlayers();

		offg.setFont(winFont);
		if (comp.amebas.size() == 0)
		{
			this.winScreen();
		}
		if (player1.amebas.size() == 0)
		{
			this.loseScreen();
		}

		g.drawImage(offscreen, 0, 0, null);
		repaint();
	}

	public void update(Graphics g)
	{
		paint(g);
	}

	@Override
	public void actionPerformed(ActionEvent arg0)
	{
		player1.update();
		comp.update();
		neutral.update();
		comp.ai(neutral, player1);
		background.update();
		takeOverEnemy(player1, neutral);
		takeOverEnemy(player1, comp);
		takeOverEnemy(comp, neutral);
		takeOverEnemy(comp, player1);

		collideAmoebas(player1, neutral);
		collideAmoebas(comp, neutral);
		collideAmoebas(player1, comp);
	}

	private void takeOverEnemy(Player player1, Player play)
	{
		for (int k = 0; k < player1.amebas.size(); k++)
		{
			Amoeba a = player1.amebas.get(k);

			for (int j = 0; j < play.amebas.size(); j++)
			{
				Amoeba neu = play.amebas.get(j);
				for (int i = 0; i < a.electrons.size(); i++)
				{
					Electron e = a.electrons.get(i);
					if (e.state == Electron.States.ATTACKING)
					{
						if (neu.isInside((int) e.position.x, (int) e.position.y))
						{
							if (neu.electrons.size() > 0)
							{
								neu.electrons.remove(neu.electrons.size() - 1);
								a.electrons.remove(i);
							} else
							{
								PointF saveNeuPos = new PointF(neu.position.x,
										neu.position.y);
								PointF saveEPos = new PointF(e.position.x,
										e.position.y);
								PointF saveESpeed = new PointF(e.speed.x,
										e.speed.y);
								play.amebas.get(j).health = 0;
								a.electrons.get(i).health = 0;
								Amoeba newAmeba = new Amoeba(saveNeuPos,
										player1, true);
								player1.amebas.add(newAmeba);
								Electron newE = new Electron(saveEPos, newAmeba);
								newAmeba.electrons.add(newE);
								newE.speed = saveESpeed;
							}
						}
					}
				}
			}

		}
		for (int j = 0; j < play.amebas.size(); j++)
		{
			Amoeba neu = play.amebas.get(j);
			if (neu.health <= 0)
				play.amebas.remove(j);

		}
		for (int k = 0; k < player1.amebas.size(); k++)
		{
			Amoeba a = player1.amebas.get(k);
			for (int i = 0; i < a.electrons.size(); i++)
			{
				Electron e = a.electrons.get(i);
				if (e.health <= 0)
					a.electrons.remove(i);
			}
		}
	}

	public void drawPlayers()
	{
		background.draw(offg);
		player1.draw(offg);
		comp.draw(offg);
		neutral.draw(offg);
	}

	public void startGame()
	{
		player1 = new Player(Color.blue, true, false);
		comp = new Player(Color.red, true, true);
		neutral = new Player(Color.gray, false, false);
		background = new Background();
	}

	@Override
	public void mouseClicked(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseEntered(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void mouseExited(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	@Override
	public void mousePressed(MouseEvent arg0)
	{
		// TODO Auto-generated method stub
		player1.mousePressed(arg0);
	}

	@Override
	public void mouseReleased(MouseEvent arg0)
	{
		// TODO Auto-generated method stub

	}

	public void winScreen()
	{
		offg.setColor(Color.red);
		offg.drawImage(youwin, 0, 0, null);
	}

	public void loseScreen()
	{
		offg.setColor(Color.red);
		offg.drawImage(youlose, 0, 0, null);
	}

	public void collideAmoebas(Player p1, Player p2)
	{
		for (Amoeba p1a : p1.amebas)
		{
			for (Amoeba p2a : p2.amebas)
			{
				float distance = (float) Point.distance(p1a.position.x,
						p1a.position.y, p2a.position.x, p2a.position.y);
				if (distance < p1a.size / 2 + p2a.size / 2)
				{
					float angle = (float) Math.atan2(p1a.position.y
							- p2a.position.y, p1a.position.x - p2a.position.x);
					p1a.speed.x = (float) (Math.cos(angle) * 1);
					p1a.speed.y = (float) (Math.sin(angle) * 1);
					p2a.speed.x = (float) (Math.cos(angle + 3.141) * 1);
					p2a.speed.y = (float) (Math.sin(angle + 3.141) * 1);
				}
			}
		}
	}
}
