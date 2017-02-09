//------------
//System Values
//------------
var STAGE_WIDTH = 416,
	STAGE_HEIGHT = 576,
	//TIME_PER_FRAME = 33, //this equates to 30 fps
	TIME_PER_FRAME = 50, //this equates to 30 fps

	GAME_FONTS = "bold 20px sans-serif";

var PATH_BG = "img/frogger_bg.png";
var PATH_FR = "img/frog_ss.png";
var PATH_JI = "img/frog_jump.png";
var PATH_CI = "img/frogger_cars.png";
var PATH_EI = "img/frogger_etc.png";
var PATH_LI = "img/frogger_lily.png";
var PATH_BGS = "img/frogger_bg_sheet.png";

var CHAR_WIDTH = 32,
	CHAR_HEIGHT = 32,
//	CHAR_START_X = STAGE_WIDTH/2,
//	CHAR_START_Y = STAGE_HEIGHT-70,
	CHAR_START_X = (STAGE_WIDTH/2) - 16,
	CHAR_START_Y = 485,

	IMAGE_START_X = 0,
	IMAGE_START_Y = 0,
	//IMAGE_START_Y = 0, // 96 2nd row

	SPRITE_WIDTH = 160;
  SPRITE_WIDTH2 = 300;

var TEXT_PRELOADING = "Loading...",
	TEXT_PRELOADING_X = (STAGE_WIDTH/2)-50,
	TEXT_PRELOADING_Y = (STAGE_HEIGHT/2)-50;
