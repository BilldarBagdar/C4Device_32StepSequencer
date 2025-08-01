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
		"rect" : [ 526.0, 290.0, 661.0, 362.0 ],
		"gridsize" : [ 15.0, 15.0 ],
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 315.0, 1242.0, 100.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"linecount" : 40,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 8.0, 445.0, 651.0, 572.0 ],
					"text" : "NOTE: Live remote scripts start sending midi messages as soon as each component asynchronously initializes. and when events occur in Live like changing the selected track, clip, or device.  This patch will ignore any of those feedback updates received (from Live) while it is processing and generating its own feedback for display on the C4 (LEDs and LCDs)\n\nSee the repository README documentation for midi port connection instructions.\n\n    \"C4 Midi In\" port should connect to the L1 loopback (coming from Live remote script midi out)\n    \"C4 Midi Out\" port should connect to the C4 DIN input port (going to the physical C4 unit)\n    \"RTC Midi In\" port should connect to the L2 loopback (coming from a Live Midi Out port with \"Sync\" checked)\n    \"Sound Module Midi Out\" port should connect to the L3 loopback (going to a Live Midi In port with \"Track\" checked)\n\nNOTE 2: The red, green, and blue \"trigger object\" indicators (left, right Xs) above only indicate changes accurately if the sequencer is processing.  If you use the remote script (in Song Function mode) to Start and Stop Transport, by definition and default, the remote script is not in USER mode so the sequencer won't be processing (will be bypassing), so the indicators aren't active. For example, if (still in Song Function mode) you switch this patch to VERBOSE above, the sequencer will begin processing midi messages.  Which means if Transport is already running when changing to VERBOSE, the right X will start indicating green and blue metronome clicks, but the left X will still indicate red because no (midi RTC or sequencer button) start or stop messages have been processed (yet).\n\nNOTE 2.5:  There is a known LCD display issue with this sequencer patch when acting as the remote script's USER mode.  \nHere is one way to reproduce the issue:\n0. Stop Transport\n1. Enter USER mode\n2. Start Transport \n3. Exit USER mode\n4. Stop Transport. BOOM!\n5. Enter USER mode (LCDs display static remote script \"feedback\", while LEDs display normal sequencer \"feedback\")\n\nWorkaround (still in USER mode):\n6. Start Transport \n7. Stop Transport\n8. Exit USER mode\n9. Enter USER mode  (LCDs and LEDs display normal sequencer \"feedback\")\n \nTLDR: to avoid the issue altogether, use VERBOSE setting, or on QUIET setting, always change Transport Start Stop status exclusively in or out of USER mode, not both. Specifically, if QUIET and you Start Transport in USER mode then Stop Transport in USER mode (or go VERBOSE before Stopping outside).  {Technically: If you Start Transport while tthis patch is \"processing\", then Stop Transport while this patch is \"processing\"}\n"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 61.0, 390.0, 572.0, 48.0 ],
					"text" : "When you need to open the sequencer AFTER Live is running with the C4 remote script, open this patch.  0 here selects initializing into \"bypassing midi processing\" mode.\nBypassing is the default way the \"32 step sequencer device\" patch (bpatcher, below) opens on its own"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 17.0, 362.0, 58.0, 22.0 ],
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
					"patching_rect" : [ 17.0, 408.0, 29.5, 22.0 ],
					"text" : "0"
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
					"patching_rect" : [ 12.0, 10.0, 657.0, 345.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 10.0, 10.0, 640.0, 337.0 ],
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 26.5, 432.0, 6.0, 432.0, 6.0, 6.0, 21.5, 6.0 ],
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
