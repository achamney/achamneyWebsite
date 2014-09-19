package org.gravity.window;

import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;

import org.gravity.adapter.ActionListener;
import org.gravity.adapter.Adapter;


public interface Window
{
	public enum Windows
	{
		OPENINGWINDOW, LEVELSELECT, GAME, LEVELBUILDER, SETTINGS,
	};

	public void draw(Adapter a);

	public void update();

	public void keyInputDown(KeyEvent e);

	public void keyInputUp(KeyEvent e);

	public void mouseInputDown(MouseEvent e);

	public void mouseInputUp(MouseEvent e);

	public void setChangeWindowListener(ActionListener al);

	public Windows getCurWindow();

	public void deactivateButtons();

	public void activateButtons();
}
