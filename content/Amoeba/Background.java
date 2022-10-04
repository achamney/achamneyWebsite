import java.awt.Color;
import java.awt.GradientPaint;
import java.awt.Graphics;
import java.awt.Graphics2D;


public class Background
{
	interface States {
		final int RED =0;
		final int GREEN =1;
		final int BLUE =2;
		final int REVERSE=3;
	}
	private float sizex;
	private float sizey;
	private Color color;
	private int state;
	private PointF position;
	public Background()
	{
		color = Color.black;
		sizey = 20;
		state = States.RED;
		position = new PointF();
	}
	public void update()
	{
		position.y += 1;
		position.x += 1;
		switch(state)
		{
		case States.RED:
			color = new Color(color.getRed()+1,color.getGreen(),color.getBlue());
			break;
		case States.BLUE:
			color = new Color(color.getRed(),color.getGreen(),color.getBlue()+1);
			break;
		case States.GREEN:
			color = new Color(color.getRed(),color.getGreen()+1,color.getBlue());
			break;
		case States.REVERSE:
			color = new Color(color.getRed()-1,color.getGreen()-1,color.getBlue()-1);
			break;
		}
		if(state == States.RED && color.getRed() >=255)
		{
			state = States.GREEN;
		}
		else if(state == States.GREEN && color.getGreen() >=255)
		{
			state = States.BLUE;
		}
		else if(state == States.BLUE && color.getBlue() >=255)
		{
			state = States.REVERSE;
		}
		else if(state == States.REVERSE && color.getBlue() <=0)
		{
			state = States.RED;
			sizex = (float)(Math.random()*60-30);
			sizey = (float)(Math.random()*60-30);
		}
		
	}
	public void draw(Graphics g)
	{
		Graphics2D g2d = (Graphics2D)g;
		GradientPaint gradient = new GradientPaint((int)position.x,(int)position.y,
				Color.black,(int)position.x + sizex*4,(int)position.y + sizey*4,color,true);
		g2d.setPaint(gradient);
		g2d.fillRect(0, 0, 1000, 600);
	}
}
