// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

var master = null;

if(typeof constructMaster === "function"){
  master = constructMaster();
}

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
	initRuntime(runtime);
}

function Tick(runtime)
{
	// Code to run every tick
}

function initRuntime(runtime){
	if(!master){
		console.log("Master Not Found");
		return;
	}
	
	master.initAction("runtime", runtime);
}

function initAction(key, value){
	if(!master){
		console.log("No Master Log: " + value)
		return
	}
	
	master.initAction(key, value);
}


const scriptsInEvents = {

	async Gameplay_Event1_Act1(runtime, localVars)
	{
		initAction("init", "menu")
	},

	async Gameplay_Event3_Act9(runtime, localVars)
	{
		initAction("button", "user_agreement_true");
	},

	async Gameplay_Event4_Act5(runtime, localVars)
	{
		initAction("button", "user_agreement_false");
	},

	async Gameplay_Event10_Act4(runtime, localVars)
	{
		initAction("button", "registration")
	},

	async Gameplay_Event11_Act8(runtime, localVars)
	{
		initAction("button", "game_start")
	},

	async Gameplay_Event12_Act5(runtime, localVars)
	{
		initAction("button", "game_start")
	},

	async Gameplay_Event13_Act2(runtime, localVars)
	{
		initAction("button", "merchandise")
	},

	async Gameplay_Event14_Act3(runtime, localVars)
	{
		initAction("button", "option_" + runtime.globalVars.SelectedOption);
	},

	async Gameplay_Event19_Act3(runtime, localVars)
	{
		initAction("button", "option_" + runtime.globalVars.SelectedOption);
	},

	async Gameplay_Event24_Act3(runtime, localVars)
	{
		initAction("button", "option_" + runtime.globalVars.SelectedOption);
	},

	async Gameplay_Event29_Act3(runtime, localVars)
	{
		initAction("button", "show_clue")
	},

	async Gameplay_Event30_Act3(runtime, localVars)
	{
		initAction("button", "show_clue")
	},

	async Gameplay_Event31_Act3(runtime, localVars)
	{
		initAction("button", "close_popup")
	},

	async Gameplay_Event32_Act2(runtime, localVars)
	{
		initAction("button", "close_popup")
	},

	async Gameplay_Event33_Act2(runtime, localVars)
	{
		initAction("button", "close_popup")
	},

	async Gameplay_Event34_Act4(runtime, localVars)
	{
		initAction("button", "close_popup")
	},

	async Gameplay_Event35_Act2(runtime, localVars)
	{
		initAction("button", "game_selesai")
	},

	async Gameplay_Event36_Act6(runtime, localVars)
	{
		initAction("button", "game_mainlagi")
	},

	async Gameplay_Event37_Act2(runtime, localVars)
	{
		initAction("button", "skip_ads")
	},

	async Loading_Event1_Act1(runtime, localVars)
	{
		initAction("init", "loading")
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

