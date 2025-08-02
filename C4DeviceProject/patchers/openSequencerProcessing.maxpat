{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 7,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 757.0, 96.0, 676.0, 371.0 ],
		"gridsize" : [ 15.0, 15.0 ],
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-50",
					"linecount" : 11,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 16.0, 435.0, 636.0, 158.0 ],
					"text" : "NOTE: Live remote scripts start sending midi messages as soon as each component asynchronously initializes. and when events occur in Live like changing the selected track, clip, or device.  This patch will ignore any of those feedback updates received (from Live) while it is processing and generating its own feedback for display on the C4 (LEDs and LCDs)\n\nSee the repository README documentation for midi port connection instructions.\n\n    \"C4 Midi In\" port should connect to the L1 loopback (coming from Live remote script midi out)\n    \"C4 Midi Out\" port should connect to the C4 DIN input port (going to the physical C4 unit)\n    \"RTC Midi In\" port should connect to the L2 loopback (coming from a Live Midi Out port with \"Sync\" checked)\n    \"Sound Module Midi Out\" port should connect to the L3 loopback (going to a Live Midi In port with \"Track\" checked)"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 56.0, 391.0, 493.0, 34.0 ],
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
					"patching_rect" : [ 16.0, 361.0, 58.0, 22.0 ],
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
					"patching_rect" : [ 16.0, 391.0, 29.5, 22.0 ],
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
					"patching_rect" : [ 16.0, 11.0, 636.0, 341.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 8.0, 14.0, 644.0, 348.0 ],
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 25.5, 433.0, 11.0, 433.0, 11.0, 6.0, 25.5, 6.0 ],
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
