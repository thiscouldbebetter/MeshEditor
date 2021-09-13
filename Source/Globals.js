
class Globals
{
	static Instance = new Globals();

	// methods

	initialize(display, scene)
	{
		this.display = display;
		this.session = new Session(scene);

		this.inputHelper = new InputHelper();

		this.display.initialize();
		this.session.initialize();
		this.update();

		this.inputHelper.initialize();
	}

	update()
	{
		this.session.update();
	}
}
