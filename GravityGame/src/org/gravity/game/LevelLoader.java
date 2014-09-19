package org.gravity.game;

import java.io.InputStream;
import java.security.AccessController;
import java.security.PrivilegedAction;
import java.util.HashMap;

public class LevelLoader
{
	HashMap<Integer, String> levels;
	int levelCounter = 0;

	public LevelLoader()
	{
		levels = new HashMap<Integer, String>();
		AccessController.doPrivileged(new PrivilegedAction<Object>()
		{ 
			public Object run()
			{

				int i=1;
				InputStream temp = getClass().getResourceAsStream("/levels/level1.lvl");
				while(temp != null)
				{
						levels.put(levelCounter++, "/levels/level"+i+".lvl");
						i++;
						temp = getClass().getResourceAsStream("/levels/level"+i+".lvl");
				}
				return null;
			}
		});
	}

	public Level loadLevel(int key)
	{
		if (key < levels.size())
		{
			final Level level = new Level(levels.get(key));

			AccessController.doPrivileged(new PrivilegedAction<Object>()
			{
				public Object run()
				{

					level.loadLevel();
					return null;
				}
			});
			return level;
		}
		return null;
	}

	public boolean hasLevel(int i)
	{
		if (i < levels.size())
			return true;
		return false;
	}

	public void putNewLevel(String savedFile)
	{
		levels.put(levelCounter++, savedFile);
	}

	public int getLevelCount()
	{
		return levels.size();
	}
}
