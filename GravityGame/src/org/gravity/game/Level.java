package org.gravity.game;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.gravity.adapter.Point;
import org.gravity.adapter.PointF;
import org.gravity.adapter.Rect;
import org.gravity.game.objects.GameObject;
import org.gravity.game.objects.Gradient;
import org.gravity.game.objects.Hole;
import org.gravity.game.objects.Obsticle;
import org.gravity.game.objects.SinkHole;
import org.gravity.game.objects.Wall;


public class Level
{
	PointF ballPos;
	PointF targetPos;
	String file;
	List<Obsticle> obsticles = new ArrayList<Obsticle>();

	public Level(String file)
	{
		this.file = file;
	}

	public void loadLevel()
	{
		try
		{
			BufferedReader br = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(file)));
			ballPos = new PointF();
			ballPos.x = Float.parseFloat(br.readLine());
			ballPos.y = Float.parseFloat(br.readLine());
			targetPos = new PointF();
			targetPos.x = Float.parseFloat(br.readLine());
			targetPos.y = Float.parseFloat(br.readLine());
			String nextLine = br.readLine();
			while (nextLine != null)
			{
				if (nextLine.equals("Hole"))
				{
					Rect rect = new Rect();
					rect.x = Integer.parseInt(br.readLine());
					rect.y = Integer.parseInt(br.readLine());
					rect.width = Integer.parseInt(br.readLine());
					rect.height = Integer.parseInt(br.readLine());
					obsticles.add(new Hole(rect));
				} else if (nextLine.contains("SinkHole"))
				{
					Rect rect = new Rect();
					rect.x = Integer.parseInt(br.readLine());
					rect.y = Integer.parseInt(br.readLine());
					rect.width = Integer.parseInt(br.readLine());
					rect.height = Integer.parseInt(br.readLine());
					float height = Float.parseFloat(br.readLine());
					float std = Float.parseFloat(br.readLine());
					obsticles.add(new SinkHole(rect, height, std));

				} else if (nextLine.contains("Gradient"))
				{
					float angle = Float.parseFloat(br.readLine());
					float height = Float.parseFloat(br.readLine());
					obsticles.add(new Gradient(height, angle));
				} else if (nextLine.contains("Wall"))
				{
					Rect rect = new Rect();
					rect.x = Integer.parseInt(br.readLine());
					rect.y = Integer.parseInt(br.readLine());
					rect.width = Integer.parseInt(br.readLine());
					rect.height = Integer.parseInt(br.readLine());
					obsticles.add(new Wall(rect));
				}
				nextLine = br.readLine();
			}

		} catch (FileNotFoundException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NumberFormatException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Collections.sort(obsticles);
	}

	public void addSolid(Obsticle solid)
	{
		obsticles.add(solid);
	}

	public PointF getBallPos()
	{
		return ballPos;
	}

	public void setBallPos(int x, int y)
	{
		ballPos.x = x;
		ballPos.y = y;
	}

	public void setTargetPos(int x, int y)
	{
		targetPos.x = x;
		targetPos.y = y;
	}

	public void saveLevel(File savedFile)
	{
		try
		{
			BufferedWriter bw = new BufferedWriter(new FileWriter(savedFile));
			writeVal(bw, "" + ballPos.x);
			writeVal(bw, "" + ballPos.y);
			writeVal(bw, "" + targetPos.x);
			writeVal(bw, "" + targetPos.y);

			for (Obsticle solid : obsticles)
			{
				writeVal(bw, "" + solid.getClass().getSimpleName());
				if (solid instanceof Wall)
				{
					Wall wall = (Wall) solid;
					writeVal(bw, "" + wall.getRect().x);
					writeVal(bw, "" + wall.getRect().y);
					writeVal(bw, "" + wall.getRect().width);
					writeVal(bw, "" + wall.getRect().height);
				}
				if (solid instanceof Hole)
				{
					Hole wall = (Hole) solid;
					writeVal(bw, "" + wall.getRect().x);
					writeVal(bw, "" + wall.getRect().y);
					writeVal(bw, "" + wall.getRect().width);
					writeVal(bw, "" + wall.getRect().height);
				}
				if (solid instanceof SinkHole)
				{
					SinkHole sink = (SinkHole) solid;
					writeVal(bw, "" + sink.getRect().x);
					writeVal(bw, "" + sink.getRect().y);
					writeVal(bw, "" + sink.getRect().width);
					writeVal(bw, "" + sink.getRect().height);
					writeVal(bw, "" + sink.getDepth());
					writeVal(bw, "" + sink.getStd());
				}
				if (solid instanceof Gradient)
				{
					Gradient sink = (Gradient) solid;
					writeVal(bw, "" + sink.getDepth());
					writeVal(bw, "" + sink.getAngle());
				}
			}
			bw.close();
		} catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void writeVal(BufferedWriter bw, String text) throws IOException
	{
		bw.write(text + "\n");
	}

	public GameObject selectObject(Point input)
	{
		GameObject returnObj = null;
		for (GameObject obj : obsticles)
		{
			if (obj.select(input.x, input.y))
			{
				returnObj = obj;
			}
		}
		return returnObj;
	}

	public void deleteObject(GameObject lastObject)
	{
		if(lastObject instanceof Obsticle)
			obsticles.remove(lastObject);
	}

	public void delete()
	{
		obsticles.clear();
		try
		{
			this.finalize();
		} catch (Throwable e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
