{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 5,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 122.0, 183.0, 922.0, 855.0 ],
		"gridsize" : [ 15.0, 15.0 ],
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-50",
					"linecount" : 23,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 12.0, 10.0, 896.0, 324.0 ],
					"text" : "NOTE: Live remote scripts start sending midi messages as soon as each component asynchronously initializes. and when events occur in Live like changing the selected track, clip, or device.  This script will ignore any of those feedback updates received (from Live) while it is processing and generating its own feedback for display on the C4 (LEDs and LCDs)\n\n\nHOWTO integrate this C4 sequencer patch with the C4 remote script: \n1. Open Live and let the Mackie C4 remote script load completely\n2. You won't see any feedback displayed on the C4 because it isn't connected yet (but the front end is connected to Live already)\n3. Open this Sequencer-startup patch which initializes the sequencer in \"bypass processing\" mode\n4. The remote script is connected now, all 4 modes are operational ChannelStrip, TrackDevice, Function and User\n\nFor integrated \"remote script USER mode\" sequencer operation\nin Live Midi Options:\n   -assign  the actual C4out midi port to the \"remote script\" input  (DIN out of C4)\n   -assign Live's \"remote script\" output to the C4's \"control port\", on the same computer that's a Loopback-in midi port \nin this patch:\n   -assign \"C4 midi in\" port here to that C4  \"control port\" in Live, (the loopback-out midi port)\n   -assign \"C4 midi out\" here directly to the actual C4in midi port  (DIN in to C4, this connection to C4in never changes)\n\nFor normal \"stand alone\" patch sequencer operation:\nin this patch:\n   -assign \"C4 midi in\" here directly to the actual C4out midi port  (DIN out of C4)\n  -open the patcher named \"openSequencerProcessing\" (or open the underlying 32StepSequencer patch, then \"manually\" change it to \"processing mode\" )"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 63.0, 427.0, 493.0, 34.0 ],
					"text" : "When you need to open Max patches AFTER Live is running, open the other patch after Live is running.  127 here selects initializing into \"processing midi processing\" mode."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 20.0, 382.0, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 20.0, 427.0, 29.5, 22.0 ],
					"text" : "127"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 1,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-3",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "C4Device_32StepSequencer.maxpat",
					"numinlets" : 1,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 20.0, 471.0, 636.0, 341.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 25.0, 339.0, 533.0, 280.0 ],
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
 ],
		"originid" : "pat-78",
		"dependency_cache" : [ 			{
				"name" : "C4Button.js",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "C4Device.js",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "C4DeviceController.js",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "C4Device_32StepSequencer.maxpat",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "C4Encoder.js",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "Consts.js",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "GetEncoderPageOffset.maxpat",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "GetEncoderValueModified.maxpat",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "GetVerboseOverride.maxpat",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "commonRequire.js",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "setupProjectMidiPorts.maxpat",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/patchers",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
