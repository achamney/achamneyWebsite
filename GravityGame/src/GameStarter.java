
import java.applet.Applet;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;

import javax.swing.JFrame;

import org.gravity.game.Level;
import org.gravity.game.Main;

public class GameStarter extends Applet
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void init()
	{
		int width = 800, height = 400;
		JFrame frame = new JFrame();
		Image offsc = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		Graphics mainoffg = offsc.getGraphics();
		Main main = new Main(offsc, mainoffg);
		main.init();
		//main.ball.reset();
		//Level level = main.levelLoader.loadLevel(0);
		//main.ball.setPosition(level.getBallPos().x, level.getBallPos().y);
		//main.gameBoard.createBoard(level);
		frame.setContentPane(main);
		frame.setSize(width + 10, height + 30);
		frame.setVisible(true);
		frame.setAlwaysOnTop(true);
	}

}
