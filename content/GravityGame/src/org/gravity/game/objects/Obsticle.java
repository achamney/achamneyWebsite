package org.gravity.game.objects;

import org.gravity.adapter.Adapter;

public interface Obsticle extends GameObject, Comparable<Obsticle>
{
	public void draw(Adapter a);

	public void collide(Ball b);
}
