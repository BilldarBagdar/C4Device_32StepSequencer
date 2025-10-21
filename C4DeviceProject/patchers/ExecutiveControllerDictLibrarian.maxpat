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
		"rect" : [ 807.0, 250.0, 1050.0, 780.0 ],
		"gridsize" : [ 15.0, 15.0 ],
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-121",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 208.0, 703.0, 66.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 279.0, 455.0, 82.0, 20.0 ],
					"text" : "SpotErase"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-123",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 170.0, 698.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 241.0, 450.0, 24.0, 24.0 ],
					"varname" : "SpotErase"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-124",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 208.0, 601.0, 66.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 279.0, 424.0, 82.0, 20.0 ],
					"text" : "Lock"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-125",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 170.0, 596.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 241.0, 419.0, 24.0, 24.0 ],
					"varname" : "Lock"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-122",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 451.5, 418.0, 50.0, 22.0 ],
					"text" : "0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-120",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 4,
					"outlettype" : [ "int", "", "", "int" ],
					"patching_rect" : [ 462.5, 384.0, 61.0, 22.0 ],
					"text" : "counter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-112",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 672.0, 715.0, 60.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1090.0, 1117.0, 82.0, 20.0 ],
					"text" : "TrackR"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-113",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 634.0, 710.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1052.0, 1112.0, 24.0, 24.0 ],
					"varname" : "TrackR"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-114",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 672.0, 677.0, 60.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1090.0, 1079.0, 82.0, 20.0 ],
					"text" : "TrackL"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-115",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 634.0, 672.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1052.0, 1074.0, 24.0, 24.0 ],
					"varname" : "TrackL"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-116",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 672.0, 644.0, 60.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1090.0, 1046.0, 82.0, 20.0 ],
					"text" : "SlotDown"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-117",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 634.0, 639.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1052.0, 1041.0, 24.0, 24.0 ],
					"varname" : "SlotDn"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-118",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 672.0, 613.0, 60.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1090.0, 1015.0, 82.0, 20.0 ],
					"text" : "SlotUp"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-119",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 634.0, 608.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1052.0, 1010.0, 24.0, 24.0 ],
					"varname" : "SlotUp"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-101",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 568.0, 712.0, 54.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 924.0, 1115.0, 82.0, 20.0 ],
					"text" : "SingleR"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-104",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 530.0, 707.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 886.0, 1110.0, 24.0, 24.0 ],
					"varname" : "StepR"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-106",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 568.0, 674.0, 54.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 924.0, 1077.0, 82.0, 20.0 ],
					"text" : "SingleL"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-107",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 530.0, 669.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 886.0, 1072.0, 24.0, 24.0 ],
					"varname" : "StepL"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-108",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 568.0, 641.0, 54.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 924.0, 1044.0, 82.0, 20.0 ],
					"text" : "BankR"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-109",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 530.0, 636.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 886.0, 1039.0, 24.0, 24.0 ],
					"varname" : "BankR"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-110",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 568.0, 610.0, 54.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 924.0, 1013.0, 82.0, 20.0 ],
					"text" : "BankL"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-111",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 530.0, 605.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 886.0, 1008.0, 24.0, 24.0 ],
					"varname" : "BankL"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-102",
					"linecount" : 6,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 795.5, 521.0, 241.0, 89.0 ],
					"text" : "sending \"emulated\" C4 midi messages to C4Device.js for \"normal\" event processing\nNOTE: These emulated event messages will come back around as \"feedback\" via send/receive channel \"midiFeedback\" (updating this \"emulated C4 display\" again)"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-81",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 795.5, 497.0, 93.0, 22.0 ],
					"text" : "s midiEmulation"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-85",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 544.5, 525.0, 115.0, 34.0 ],
					"text" : "sending \"feedback\" to the C4 display"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 467.5, 452.0, 68.0, 22.0 ],
					"text" : "r c4mout"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 544.5, 497.0, 126.0, 22.0 ],
					"text" : "midiout @matchport 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-74",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "bang", "bang" ],
					"patching_rect" : [ 490.5, 315.0, 73.0, 22.0 ],
					"text" : "b"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 490.5, 283.0, 91.0, 22.0 ],
					"text" : "r deviceLoaded"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-103",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 599.5, 356.0, 107.0, 22.0 ],
					"text" : "prepend midievent"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-86",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 599.5, 316.0, 91.0, 22.0 ],
					"text" : "r midiFeedback"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-79",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 5,
					"outlettype" : [ "dictionary", "", "", "", "" ],
					"patching_rect" : [ 135.5, 50.0, 84.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"legacy" : 0,
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "dict c4Buttons"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-75",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 5,
					"outlettype" : [ "dictionary", "", "", "", "" ],
					"patching_rect" : [ 18.5, 50.0, 94.0, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"legacy" : 0,
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "dict c4Encoders"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 544.5, 356.0, 29.5, 22.0 ],
					"text" : "init"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-93",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 477.0, 709.0, 47.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 400.0, 514.0, 82.0, 20.0 ],
					"text" : "Alt"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-94",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 439.0, 704.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 362.0, 509.0, 24.0, 24.0 ],
					"varname" : "Alt"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-95",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 477.0, 671.0, 47.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 400.0, 476.0, 82.0, 20.0 ],
					"text" : "Control"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-96",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 439.0, 666.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 362.0, 471.0, 24.0, 24.0 ],
					"varname" : "Control"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-97",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 477.0, 638.0, 47.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 400.0, 443.0, 82.0, 20.0 ],
					"text" : "Option"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-98",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 439.0, 633.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 362.0, 438.0, 24.0, 24.0 ],
					"varname" : "Option"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-99",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 477.0, 607.0, 47.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 400.0, 412.0, 82.0, 20.0 ],
					"text" : "Shift"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-100",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 439.0, 602.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 362.0, 407.0, 24.0, 24.0 ],
					"varname" : "Shift"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-91",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 320.0, 706.0, 71.5, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 264.0, 511.0, 82.0, 20.0 ],
					"text" : "Function"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-92",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 281.5, 701.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 226.0, 506.0, 24.0, 24.0 ],
					"varname" : "Function"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-89",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 320.0, 668.0, 71.5, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 264.0, 473.0, 82.0, 20.0 ],
					"text" : "Chan Strip"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-90",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 281.5, 663.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 226.0, 468.0, 24.0, 24.0 ],
					"varname" : "ChStrip"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-87",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 320.0, 635.0, 71.5, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 264.0, 440.0, 82.0, 20.0 ],
					"text" : "Track"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-88",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 281.5, 630.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 226.0, 435.0, 24.0, 24.0 ],
					"varname" : "Track"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-83",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 320.0, 604.0, 71.5, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 264.0, 409.0, 82.0, 20.0 ],
					"text" : "Marker"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-84",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 281.5, 599.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 226.0, 404.0, 24.0, 24.0 ],
					"varname" : "Marker"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-82",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 84.0, 700.0, 79.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 99.0, 508.0, 79.0, 20.0 ],
					"text" : "Split Button"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-80",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 43.5, 698.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.0, 506.0, 24.0, 24.0 ],
					"varname" : "SplitButton"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-78",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 81.0, 662.0, 82.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 96.0, 470.0, 82.0, 20.0 ],
					"text" : "Split 3/1 LED"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-77",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 81.0, 629.0, 82.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 96.0, 437.0, 82.0, 20.0 ],
					"text" : "Split 2/2 LED"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-76",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 81.0, 598.0, 82.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 96.0, 406.0, 82.0, 20.0 ],
					"text" : "Split 1/3 LED"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-73",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 43.5, 660.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.0, 468.0, 24.0, 24.0 ],
					"varname" : "Split31"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-72",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 43.5, 627.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.0, 435.0, 24.0, 24.0 ],
					"varname" : "Split22"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-71",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 43.5, 593.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.0, 401.0, 24.0, 24.0 ],
					"varname" : "Split13"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-55",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 359.5, 482.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 375.0, 290.0, 24.0, 24.0 ],
					"varname" : "enb31"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 350.5, 511.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 366.0, 319.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.31",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.31",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc31"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-57",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 316.5, 482.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 332.0, 290.0, 24.0, 24.0 ],
					"varname" : "enb30"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-58",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 307.5, 511.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 323.0, 319.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.30",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.30",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc30"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-59",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 273.5, 482.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 289.0, 290.0, 24.0, 24.0 ],
					"varname" : "enb29"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-60",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 264.5, 511.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 280.0, 319.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.29",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.29",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc29"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-61",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 230.5, 482.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 246.0, 290.0, 24.0, 24.0 ],
					"varname" : "enb28"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-62",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 221.5, 511.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 237.0, 319.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.28",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.28",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc28"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-63",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 181.5, 482.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 197.0, 290.0, 24.0, 24.0 ],
					"varname" : "enb27"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-64",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 172.5, 511.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 188.0, 319.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.27",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.27",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc27"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-65",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 138.5, 482.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 154.0, 290.0, 24.0, 24.0 ],
					"varname" : "enb26"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-66",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 129.5, 511.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 145.0, 319.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.26",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.26",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc26"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 95.5, 482.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 111.0, 290.0, 24.0, 24.0 ],
					"varname" : "enb25"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-68",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 86.5, 511.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 102.0, 319.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.25",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.25",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc25"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-69",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 52.5, 482.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 68.0, 290.0, 24.0, 24.0 ],
					"varname" : "enb24"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-70",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 43.5, 511.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.0, 319.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.24",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.24",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc24"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 359.5, 392.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 375.0, 200.0, 24.0, 24.0 ],
					"varname" : "enb23"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 350.5, 421.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 366.0, 229.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.23",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.23",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc23"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 316.5, 392.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 332.0, 200.0, 24.0, 24.0 ],
					"varname" : "enb22"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 307.5, 421.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 323.0, 229.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.22",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.22",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc22"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 273.5, 392.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 289.0, 200.0, 24.0, 24.0 ],
					"varname" : "enb21"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 264.5, 421.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 280.0, 229.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.21",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.21",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc21"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 230.5, 392.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 246.0, 200.0, 24.0, 24.0 ],
					"varname" : "enb20"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 221.5, 421.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 237.0, 229.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.20",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.20",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc20"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 181.5, 392.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 197.0, 200.0, 24.0, 24.0 ],
					"varname" : "enb19"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-48",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 172.5, 421.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 188.0, 229.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.19",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.19",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc19"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 138.5, 392.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 154.0, 200.0, 24.0, 24.0 ],
					"varname" : "enb18"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 129.5, 421.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 145.0, 229.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.18",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.18",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc18"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-51",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 95.5, 392.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 111.0, 200.0, 24.0, 24.0 ],
					"varname" : "enb17"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-52",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 86.5, 421.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 102.0, 229.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.17",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.17",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc17"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-53",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 52.5, 392.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 68.0, 200.0, 24.0, 24.0 ],
					"varname" : "enb16"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 43.5, 421.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.0, 229.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.16",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.16",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc16"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 359.5, 300.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 375.0, 108.0, 24.0, 24.0 ],
					"varname" : "enb15"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 350.5, 329.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 366.0, 137.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.15",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.15",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc15"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 316.5, 300.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 332.0, 108.0, 24.0, 24.0 ],
					"varname" : "enb14"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 307.5, 329.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 323.0, 137.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.14",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.14",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc14"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-27",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 273.5, 300.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 289.0, 108.0, 24.0, 24.0 ],
					"varname" : "enb13"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 264.5, 329.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 280.0, 137.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.13",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.13",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc13"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-29",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 230.5, 300.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 246.0, 108.0, 24.0, 24.0 ],
					"varname" : "enb12"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 221.5, 329.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 237.0, 137.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.12",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.12",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc12"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 181.5, 300.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 197.0, 108.0, 24.0, 24.0 ],
					"varname" : "enb11"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-32",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 172.5, 329.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 188.0, 137.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.11",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.11",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc11"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 138.5, 300.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 154.0, 108.0, 24.0, 24.0 ],
					"varname" : "enb10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-34",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 129.5, 329.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 145.0, 137.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.10",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.10",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-35",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 95.5, 300.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 111.0, 108.0, 24.0, 24.0 ],
					"varname" : "enb09"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 86.5, 329.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 102.0, 137.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.09",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.09",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc09"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 52.5, 300.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 68.0, 108.0, 24.0, 24.0 ],
					"varname" : "enb08"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 43.5, 329.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.0, 137.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.08",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.08",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc08"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 359.5, 210.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 375.0, 13.0, 24.0, 24.0 ],
					"varname" : "enb07"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 350.5, 239.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 366.0, 42.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.07",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.07",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc07"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 316.5, 210.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 332.0, 13.0, 24.0, 24.0 ],
					"varname" : "enb06"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 307.5, 239.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 323.0, 42.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.06",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.06",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc06"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 273.5, 210.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 289.0, 13.0, 24.0, 24.0 ],
					"varname" : "enb05"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 264.5, 239.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 280.0, 42.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.05",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.05",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc05"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 230.5, 210.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 246.0, 13.0, 24.0, 24.0 ],
					"varname" : "enb04"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 221.5, 239.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 237.0, 42.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.04",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.04",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc04"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 181.5, 210.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 197.0, 13.0, 24.0, 24.0 ],
					"varname" : "enb03"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 172.5, 239.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 188.0, 42.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.03",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.03",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc03"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 138.5, 210.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 154.0, 13.0, 24.0, 24.0 ],
					"varname" : "enb02"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 129.5, 239.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 145.0, 42.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.02",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.02",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc02"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 95.5, 210.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 111.0, 13.0, 24.0, 24.0 ],
					"varname" : "enb01"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 86.5, 239.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 102.0, 42.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.01",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.01",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc01"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "led",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 52.5, 210.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 68.0, 13.0, 24.0, 24.0 ],
					"varname" : "enb00"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 44.0, 239.0, 41.0, 48.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 59.0, 42.0, 41.0, 48.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "enc.00",
							"parameter_modmode" : 4,
							"parameter_shortname" : "enc.00",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "enc00"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 544.5, 452.0, 270.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "ExecutiveControllerLibrarian.js",
						"parameter_enable" : 0
					}
,
					"text" : "js ExecutiveControllerLibrarian.js @autowatch 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 5,
					"outlettype" : [ "dictionary", "", "", "", "" ],
					"patching_rect" : [ 19.0, 18.0, 200.5, 22.0 ],
					"saved_object_attributes" : 					{
						"embed" : 0,
						"legacy" : 0,
						"parameter_enable" : 0,
						"parameter_mappable" : 0
					}
,
					"text" : "dict C4DeviceExecutiveController",
					"varname" : "maxLibrarian"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-103", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-122", 1 ],
					"source" : [ "obj-120", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-81", 0 ],
					"source" : [ "obj-2", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-120", 0 ],
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-74", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-103", 0 ],
					"source" : [ "obj-86", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-11" : [ "enc.02", "enc.02", 0 ],
			"obj-13" : [ "enc.03", "enc.03", 0 ],
			"obj-15" : [ "enc.04", "enc.04", 0 ],
			"obj-17" : [ "enc.05", "enc.05", 0 ],
			"obj-19" : [ "enc.06", "enc.06", 0 ],
			"obj-21" : [ "enc.07", "enc.07", 0 ],
			"obj-24" : [ "enc.15", "enc.15", 0 ],
			"obj-26" : [ "enc.14", "enc.14", 0 ],
			"obj-28" : [ "enc.13", "enc.13", 0 ],
			"obj-30" : [ "enc.12", "enc.12", 0 ],
			"obj-32" : [ "enc.11", "enc.11", 0 ],
			"obj-34" : [ "enc.10", "enc.10", 0 ],
			"obj-36" : [ "enc.09", "enc.09", 0 ],
			"obj-38" : [ "enc.08", "enc.08", 0 ],
			"obj-40" : [ "enc.23", "enc.23", 0 ],
			"obj-42" : [ "enc.22", "enc.22", 0 ],
			"obj-44" : [ "enc.21", "enc.21", 0 ],
			"obj-46" : [ "enc.20", "enc.20", 0 ],
			"obj-48" : [ "enc.19", "enc.19", 0 ],
			"obj-50" : [ "enc.18", "enc.18", 0 ],
			"obj-52" : [ "enc.17", "enc.17", 0 ],
			"obj-54" : [ "enc.16", "enc.16", 0 ],
			"obj-56" : [ "enc.31", "enc.31", 0 ],
			"obj-58" : [ "enc.30", "enc.30", 0 ],
			"obj-6" : [ "enc.00", "enc.00", 0 ],
			"obj-60" : [ "enc.29", "enc.29", 0 ],
			"obj-62" : [ "enc.28", "enc.28", 0 ],
			"obj-64" : [ "enc.27", "enc.27", 0 ],
			"obj-66" : [ "enc.26", "enc.26", 0 ],
			"obj-68" : [ "enc.25", "enc.25", 0 ],
			"obj-70" : [ "enc.24", "enc.24", 0 ],
			"obj-9" : [ "enc.01", "enc.01", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "C4Button.js",
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
				"name" : "ExecutiveControllerLibrarian.js",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "commonRequire.js",
				"bootpath" : "D:/music/maxStuff/C4Projects/C4Device_32StepSequencer/C4DeviceProject/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
