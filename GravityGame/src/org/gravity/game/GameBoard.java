package org.gravity.game;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.gravity.adapter.Adapter;
import org.gravity.adapter.Color;
import org.gravity.adapter.PointF;
import org.gravity.game.objects.Ball;
import org.gravity.game.objects.GameObject;
import org.gravity.game.objects.Obsticle;
import org.gravity.game.objects.Target;


public class GameBoard
{
	int squareWidth = 0, squareHeight = 0;
	int flowDistance;
	List<Obsticle> solids;
	Target target;
	Level level;
	Ball ball;
	public static int width, height;

	public GameBoard(int width, int height)
	{
		ball = new Ball(new PointF(width / 2, height / 2));
		GameBoard.width = width;
		GameBoard.height = height;
		solids = new ArrayList<Obsticle>();

		target = new Target(new PointF());
	}

	public void draw(Adapter a)
	{

		a.fillRect(0, 0, width, height, Color.fromArgb(0, 135, 255));

		for (Obsticle solid : solids)
		{
			solid.draw(a);
		}
		target.draw(a);
		
		ball.draw(a);
	}

	public void createBoard(Level level)
	{
		this.solids = level.obsticles;
		Collections.sort(solids);
		this.target = new Target(level.targetPos);
		this.ball.setPosition(level.getBallPos().x, level.getBallPos().y);
		this.level = level;
	}

	public void update()
	{
		for (Obsticle solid : solids)
		{
			solid.update();
		}
	}

	public void updateBall()
	{
		for (Obsticle solid : solids)
		{
			solid.collide(ball);
		}
		ball.update();
		if (target.collide(ball))
		{
			ball.setActive(false);
			ball.setWin(true);
		}
	}

	public Level getLevel()
	{
		return level;
	}

	public void updateLevel(Level level)
	{
		createBoard(level);
	}

	public void deleteObject(GameObject lastObject)
	{
		if (lastObject instanceof Obsticle)
			solids.remove(lastObject);
	}

	public Ball getBall()
	{
		return ball;
	}
}
