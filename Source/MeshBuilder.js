
class MeshBuilder
{
	static cube()
	{
		var returnValue = new Mesh
		(
			// vertices
			[
				// top
				new Coords(-1, -1, -1), // 0 - nw
				new Coords(1, -1, -1), // 1 - ne
				new Coords(1, 1, -1), // 2 - se
				new Coords(-1, 1, -1), // 3 - sw
				 
				// bottom
				new Coords(-1, -1, 1), // 4 - nw
				new Coords(1, -1, 1), // 5 - ne
				new Coords(1, 1, 1), // 6 - se
				new Coords(-1, 1, 1), // 7 - sw
			],
			// faces
			[
				new Face([0, 3, 2, 1]), // top
				new Face([1, 2, 6, 5]), // east
				new Face([2, 3, 7, 6]), // south 
				new Face([3, 0, 4, 7]), // west
				new Face([0, 1, 5, 4]), // north
				new Face([4, 5, 6, 7]), // bottom
			]
		);
		 
		return returnValue;
	}
}
