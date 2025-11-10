{
    "patcher": {
        "fileversion": 1,
        "appversion": {
            "major": 9,
            "minor": 1,
            "revision": 0,
            "architecture": "x64",
            "modernui": 1
        },
        "classnamespace": "box",
        "rect": [ 757.0, 173.0, 882.0, 573.0 ],
        "boxes": [
            {
                "box": {
                    "id": "obj-122",
                    "linecount": 8,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 439.0, 482.0, 293.0, 117.0 ],
                    "presentation": 1,
                    "presentation_linecount": 6,
                    "presentation_rect": [ 419.0, 325.0, 426.0, 89.0 ],
                    "text": "NOTE: The C4 buttons associated with these \"LED\" objects do not have actual LEDs, but data is stored as if they did have LEDs and that spurious \"LED ON/OFF\" status is displayed here.  All 12 of these buttons always trigger associated behavior when the button is  pressed (and released), the other 7 buttons (with LEDs) have associated behavior that is only active when the LED is ON."
                }
            },
            {
                "box": {
                    "id": "obj-103",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "patching_rect": [ 739.0, 298.0, 58.0, 22.0 ],
                    "text": "loadbang"
                }
            },
            {
                "box": {
                    "id": "obj-74",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 574.0, 408.0, 176.0, 22.0 ],
                    "text": "prepend copySequenceToPage"
                }
            },
            {
                "box": {
                    "id": "obj-102",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 954.5, 434.0, 145.0, 22.0 ],
                    "text": "copy shift 0 0"
                }
            },
            {
                "box": {
                    "id": "obj-86",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 697.0, 331.0, 34.0, 22.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 447.0, 130.0, 34.0, 22.0 ],
                    "text": "copy"
                }
            },
            {
                "box": {
                    "id": "obj-81",
                    "linecount": 2,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 862.0, 224.0, 215.0, 34.0 ],
                    "presentation": 1,
                    "presentation_linecount": 2,
                    "presentation_rect": [ 612.0, 23.0, 215.0, 34.0 ],
                    "text": "any existing data at destination will be overwritten by copied data"
                }
            },
            {
                "box": {
                    "id": "obj-149",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "patching_rect": [ 977.0, 298.0, 58.0, 22.0 ],
                    "text": "loadbang"
                }
            },
            {
                "box": {
                    "id": "obj-148",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "patching_rect": [ 858.0, 298.0, 58.0, 22.0 ],
                    "text": "loadbang"
                }
            },
            {
                "box": {
                    "id": "obj-147",
                    "maxclass": "button",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 697.0, 292.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 447.0, 91.0, 24.0, 24.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-145",
                    "linecount": 2,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 977.0, 263.0, 100.0, 34.0 ],
                    "presentation": 1,
                    "presentation_linecount": 2,
                    "presentation_rect": [ 727.0, 62.0, 100.0, 34.0 ],
                    "text": "destination page for copied data"
                }
            },
            {
                "box": {
                    "id": "obj-142",
                    "linecount": 2,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 858.0, 263.0, 100.0, 34.0 ],
                    "presentation": 1,
                    "presentation_linecount": 2,
                    "presentation_rect": [ 608.0, 62.0, 100.0, 34.0 ],
                    "text": "destination deck for copied data"
                }
            },
            {
                "box": {
                    "id": "obj-140",
                    "linecount": 3,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 738.0, 245.0, 101.0, 48.0 ],
                    "presentation": 1,
                    "presentation_linecount": 3,
                    "presentation_rect": [ 488.0, 44.0, 101.0, 48.0 ],
                    "text": "what data on current page to copy"
                }
            },
            {
                "box": {
                    "id": "obj-138",
                    "items": [ "default", ",", 1, ",", 2, ",", 3 ],
                    "maxclass": "umenu",
                    "numinlets": 1,
                    "numoutlets": 3,
                    "outlettype": [ "int", "", "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 977.0, 331.0, 100.0, 22.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 727.0, 130.0, 100.0, 22.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-137",
                    "maxclass": "newobj",
                    "numinlets": 4,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 779.0, 384.0, 73.0, 22.0 ],
                    "text": "pack s s 0 0"
                }
            },
            {
                "box": {
                    "id": "obj-136",
                    "items": [ "default", ",", "marker", ",", "track", ",", "chanSt", ",", "funct" ],
                    "maxclass": "umenu",
                    "numinlets": 1,
                    "numoutlets": 3,
                    "outlettype": [ "int", "", "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 858.0, 331.0, 100.0, 22.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 608.0, 130.0, 100.0, 22.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-135",
                    "items": [ "all", ",", "sequence", ",", "values", ",", "pressed", ",", "released", ",", "shift", ",", "option", ",", "control", ",", "alt" ],
                    "maxclass": "umenu",
                    "numinlets": 1,
                    "numoutlets": 3,
                    "outlettype": [ "int", "", "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 739.0, 331.0, 100.0, 22.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 489.0, 130.0, 100.0, 22.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-130",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 532.0, 271.0, 54.0, 22.0 ],
                    "text": "deferlow"
                }
            },
            {
                "box": {
                    "id": "obj-133",
                    "linecount": 3,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 459.0, 174.0, 235.0, 48.0 ],
                    "text": "librarian is only fully initialized after C4Device.js has \"loaded Up\" and banged \"deviceLoaded\""
                }
            },
            {
                "box": {
                    "id": "obj-131",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 561.5, 356.0, 98.0, 22.0 ],
                    "text": "c4DeviceLoaded"
                }
            },
            {
                "box": {
                    "id": "obj-129",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "bang", "bang" ],
                    "patching_rect": [ 532.0, 316.0, 49.0, 22.0 ],
                    "text": "t b b"
                }
            },
            {
                "box": {
                    "id": "obj-127",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "patching_rect": [ 459.0, 224.0, 58.0, 22.0 ],
                    "text": "loadbang"
                }
            },
            {
                "box": {
                    "id": "obj-105",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 476.0, 380.0, 47.0, 22.0 ],
                    "text": "print lib"
                }
            },
            {
                "box": {
                    "id": "obj-121",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 208.0, 703.0, 66.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 177.0, 521.0, 82.0, 20.0 ],
                    "text": "SpotErase"
                }
            },
            {
                "box": {
                    "id": "obj-123",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 170.0, 698.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 139.0, 516.0, 24.0, 24.0 ],
                    "varname": "SpotErase"
                }
            },
            {
                "box": {
                    "id": "obj-124",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 208.0, 601.0, 66.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 177.0, 419.0, 82.0, 20.0 ],
                    "text": "Lock"
                }
            },
            {
                "box": {
                    "id": "obj-125",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 170.0, 596.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 139.0, 414.0, 24.0, 24.0 ],
                    "varname": "Lock"
                }
            },
            {
                "box": {
                    "id": "obj-112",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 672.0, 715.0, 60.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 763.0, 531.0, 82.0, 20.0 ],
                    "text": "TrackR"
                }
            },
            {
                "box": {
                    "id": "obj-113",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 634.0, 710.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 725.0, 526.0, 24.0, 24.0 ],
                    "varname": "TrackR"
                }
            },
            {
                "box": {
                    "id": "obj-114",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 672.0, 677.0, 60.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 763.0, 493.0, 82.0, 20.0 ],
                    "text": "TrackL"
                }
            },
            {
                "box": {
                    "id": "obj-115",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 634.0, 672.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 725.0, 488.0, 24.0, 24.0 ],
                    "varname": "TrackL"
                }
            },
            {
                "box": {
                    "id": "obj-116",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 672.0, 644.0, 60.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 763.0, 460.0, 82.0, 20.0 ],
                    "text": "SlotDown"
                }
            },
            {
                "box": {
                    "id": "obj-117",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 634.0, 639.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 725.0, 455.0, 24.0, 24.0 ],
                    "varname": "SlotDn"
                }
            },
            {
                "box": {
                    "id": "obj-118",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 672.0, 613.0, 60.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 763.0, 429.0, 82.0, 20.0 ],
                    "text": "SlotUp"
                }
            },
            {
                "box": {
                    "id": "obj-119",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 634.0, 608.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 725.0, 424.0, 24.0, 24.0 ],
                    "varname": "SlotUp"
                }
            },
            {
                "box": {
                    "id": "obj-101",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 568.0, 712.0, 54.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 597.0, 529.0, 82.0, 20.0 ],
                    "text": "SingleR"
                }
            },
            {
                "box": {
                    "id": "obj-104",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 530.0, 707.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 559.0, 524.0, 24.0, 24.0 ],
                    "varname": "StepR"
                }
            },
            {
                "box": {
                    "id": "obj-106",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 568.0, 674.0, 54.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 597.0, 491.0, 82.0, 20.0 ],
                    "text": "SingleL"
                }
            },
            {
                "box": {
                    "id": "obj-107",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 530.0, 669.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 559.0, 486.0, 24.0, 24.0 ],
                    "varname": "StepL"
                }
            },
            {
                "box": {
                    "id": "obj-108",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 568.0, 641.0, 54.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 597.0, 458.0, 82.0, 20.0 ],
                    "text": "BankR"
                }
            },
            {
                "box": {
                    "id": "obj-109",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 530.0, 636.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 559.0, 453.0, 24.0, 24.0 ],
                    "varname": "BankR"
                }
            },
            {
                "box": {
                    "id": "obj-110",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 568.0, 610.0, 54.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 597.0, 427.0, 82.0, 20.0 ],
                    "text": "BankL"
                }
            },
            {
                "box": {
                    "id": "obj-111",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 530.0, 605.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 559.0, 422.0, 24.0, 24.0 ],
                    "varname": "BankL"
                }
            },
            {
                "box": {
                    "id": "obj-85",
                    "linecount": 2,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 891.0, 525.0, 115.0, 34.0 ],
                    "text": "sending \"feedback\" to the C4 display"
                }
            },
            {
                "box": {
                    "id": "obj-3",
                    "maxclass": "newobj",
                    "numinlets": 0,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 891.0, 463.0, 68.0, 22.0 ],
                    "text": "r c4mout"
                }
            },
            {
                "box": {
                    "id": "obj-4",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 891.0, 495.0, 126.0, 22.0 ],
                    "text": "midiout @matchport 1"
                }
            },
            {
                "box": {
                    "id": "obj-22",
                    "maxclass": "newobj",
                    "numinlets": 0,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 532.0, 224.0, 91.0, 22.0 ],
                    "text": "r deviceLoaded"
                }
            },
            {
                "box": {
                    "id": "obj-79",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 5,
                    "outlettype": [ "dictionary", "", "", "", "" ],
                    "patching_rect": [ 636.0, 39.0, 84.0, 22.0 ],
                    "saved_object_attributes": {
                        "legacy": 1,
                        "parameter_enable": 0,
                        "parameter_mappable": 0
                    },
                    "text": "dict c4Buttons"
                }
            },
            {
                "box": {
                    "id": "obj-75",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 5,
                    "outlettype": [ "dictionary", "", "", "", "" ],
                    "patching_rect": [ 519.0, 39.0, 94.0, 22.0 ],
                    "saved_object_attributes": {
                        "legacy": 1,
                        "parameter_enable": 0,
                        "parameter_mappable": 0
                    },
                    "text": "dict c4Encoders"
                }
            },
            {
                "box": {
                    "id": "obj-5",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 532.0, 356.0, 29.5, 22.0 ],
                    "text": "init"
                }
            },
            {
                "box": {
                    "id": "obj-93",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 477.0, 709.0, 47.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 457.0, 529.0, 82.0, 20.0 ],
                    "text": "Alt"
                }
            },
            {
                "box": {
                    "id": "obj-94",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 439.0, 704.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 419.0, 524.0, 24.0, 24.0 ],
                    "varname": "Alt"
                }
            },
            {
                "box": {
                    "id": "obj-95",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 477.0, 671.0, 47.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 457.0, 491.0, 82.0, 20.0 ],
                    "text": "Control"
                }
            },
            {
                "box": {
                    "id": "obj-96",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 439.0, 666.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 419.0, 486.0, 24.0, 24.0 ],
                    "varname": "Control"
                }
            },
            {
                "box": {
                    "id": "obj-97",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 477.0, 638.0, 47.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 457.0, 458.0, 82.0, 20.0 ],
                    "text": "Option"
                }
            },
            {
                "box": {
                    "id": "obj-98",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 439.0, 633.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 419.0, 453.0, 24.0, 24.0 ],
                    "varname": "Option"
                }
            },
            {
                "box": {
                    "id": "obj-99",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 477.0, 607.0, 47.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 457.0, 427.0, 82.0, 20.0 ],
                    "text": "Shift"
                }
            },
            {
                "box": {
                    "id": "obj-100",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 439.0, 602.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 419.0, 422.0, 24.0, 24.0 ],
                    "varname": "Shift"
                }
            },
            {
                "box": {
                    "id": "obj-91",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 320.0, 706.0, 71.5, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 321.0, 526.0, 82.0, 20.0 ],
                    "text": "Function"
                }
            },
            {
                "box": {
                    "id": "obj-92",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 281.5, 701.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 283.0, 521.0, 24.0, 24.0 ],
                    "varname": "Function"
                }
            },
            {
                "box": {
                    "id": "obj-89",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 320.0, 668.0, 71.5, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 321.0, 488.0, 82.0, 20.0 ],
                    "text": "Chan Strip"
                }
            },
            {
                "box": {
                    "id": "obj-90",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 281.5, 663.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 283.0, 483.0, 24.0, 24.0 ],
                    "varname": "ChStrip"
                }
            },
            {
                "box": {
                    "id": "obj-87",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 320.0, 635.0, 71.5, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 321.0, 455.0, 82.0, 20.0 ],
                    "text": "Track"
                }
            },
            {
                "box": {
                    "id": "obj-88",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 281.5, 630.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 283.0, 450.0, 24.0, 24.0 ],
                    "varname": "Track"
                }
            },
            {
                "box": {
                    "id": "obj-83",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 320.0, 604.0, 71.5, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 321.0, 424.0, 82.0, 20.0 ],
                    "text": "Marker"
                }
            },
            {
                "box": {
                    "id": "obj-84",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 281.5, 599.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 283.0, 419.0, 24.0, 24.0 ],
                    "varname": "Marker"
                }
            },
            {
                "box": {
                    "id": "obj-82",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 84.0, 700.0, 79.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 50.0, 518.0, 79.0, 20.0 ],
                    "text": "Split Button"
                }
            },
            {
                "box": {
                    "id": "obj-80",
                    "maxclass": "button",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 43.5, 698.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 10.0, 516.0, 24.0, 24.0 ],
                    "varname": "SplitButton"
                }
            },
            {
                "box": {
                    "id": "obj-78",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 81.0, 662.0, 82.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 47.0, 480.0, 82.0, 20.0 ],
                    "text": "Split 3/1 LED"
                }
            },
            {
                "box": {
                    "id": "obj-77",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 81.0, 629.0, 82.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 47.0, 447.0, 82.0, 20.0 ],
                    "text": "Split 2/2 LED"
                }
            },
            {
                "box": {
                    "id": "obj-76",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 81.0, 598.0, 82.0, 20.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 47.0, 416.0, 82.0, 20.0 ],
                    "text": "Split 1/3 LED"
                }
            },
            {
                "box": {
                    "id": "obj-73",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 43.5, 660.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 10.0, 478.0, 24.0, 24.0 ],
                    "varname": "Split31"
                }
            },
            {
                "box": {
                    "id": "obj-72",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 43.5, 627.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 10.0, 445.0, 24.0, 24.0 ],
                    "varname": "Split22"
                }
            },
            {
                "box": {
                    "id": "obj-71",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 43.5, 593.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 10.0, 411.0, 24.0, 24.0 ],
                    "varname": "Split13"
                }
            },
            {
                "box": {
                    "id": "obj-55",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 359.5, 482.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 326.0, 300.0, 24.0, 24.0 ],
                    "varname": "enb31"
                }
            },
            {
                "box": {
                    "id": "obj-56",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 350.5, 511.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 317.0, 329.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.31",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.31",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc31"
                }
            },
            {
                "box": {
                    "id": "obj-57",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 316.5, 482.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 283.0, 300.0, 24.0, 24.0 ],
                    "varname": "enb30"
                }
            },
            {
                "box": {
                    "id": "obj-58",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 307.5, 511.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 274.0, 329.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.30",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.30",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc30"
                }
            },
            {
                "box": {
                    "id": "obj-59",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 273.5, 482.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 240.0, 300.0, 24.0, 24.0 ],
                    "varname": "enb29"
                }
            },
            {
                "box": {
                    "id": "obj-60",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 264.5, 511.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 231.0, 329.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.29",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.29",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc29"
                }
            },
            {
                "box": {
                    "id": "obj-61",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 230.5, 482.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 197.0, 300.0, 24.0, 24.0 ],
                    "varname": "enb28"
                }
            },
            {
                "box": {
                    "id": "obj-62",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 221.5, 511.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 188.0, 329.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.28",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.28",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc28"
                }
            },
            {
                "box": {
                    "id": "obj-63",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 181.5, 482.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 148.0, 300.0, 24.0, 24.0 ],
                    "varname": "enb27"
                }
            },
            {
                "box": {
                    "id": "obj-64",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 172.5, 511.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 139.0, 329.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.27",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.27",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc27"
                }
            },
            {
                "box": {
                    "id": "obj-65",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 138.5, 482.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 105.0, 300.0, 24.0, 24.0 ],
                    "varname": "enb26"
                }
            },
            {
                "box": {
                    "id": "obj-66",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 129.5, 511.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 96.0, 329.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.26",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.26",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc26"
                }
            },
            {
                "box": {
                    "id": "obj-67",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 95.5, 482.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 62.0, 300.0, 24.0, 24.0 ],
                    "varname": "enb25"
                }
            },
            {
                "box": {
                    "id": "obj-68",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 86.5, 511.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 53.0, 329.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.25",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.25",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc25"
                }
            },
            {
                "box": {
                    "id": "obj-69",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 52.5, 482.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 19.0, 300.0, 24.0, 24.0 ],
                    "varname": "enb24"
                }
            },
            {
                "box": {
                    "id": "obj-70",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 43.5, 511.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 10.0, 329.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.24",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.24",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc24"
                }
            },
            {
                "box": {
                    "id": "obj-39",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 359.5, 392.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 326.0, 210.0, 24.0, 24.0 ],
                    "varname": "enb23"
                }
            },
            {
                "box": {
                    "id": "obj-40",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 350.5, 421.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 317.0, 239.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.23",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.23",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc23"
                }
            },
            {
                "box": {
                    "id": "obj-41",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 316.5, 392.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 283.0, 210.0, 24.0, 24.0 ],
                    "varname": "enb22"
                }
            },
            {
                "box": {
                    "id": "obj-42",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 307.5, 421.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 274.0, 239.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.22",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.22",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc22"
                }
            },
            {
                "box": {
                    "id": "obj-43",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 273.5, 392.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 240.0, 210.0, 24.0, 24.0 ],
                    "varname": "enb21"
                }
            },
            {
                "box": {
                    "id": "obj-44",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 264.5, 421.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 231.0, 239.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.21",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.21",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc21"
                }
            },
            {
                "box": {
                    "id": "obj-45",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 230.5, 392.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 197.0, 210.0, 24.0, 24.0 ],
                    "varname": "enb20"
                }
            },
            {
                "box": {
                    "id": "obj-46",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 221.5, 421.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 188.0, 239.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.20",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.20",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc20"
                }
            },
            {
                "box": {
                    "id": "obj-47",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 181.5, 392.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 148.0, 210.0, 24.0, 24.0 ],
                    "varname": "enb19"
                }
            },
            {
                "box": {
                    "id": "obj-48",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 172.5, 421.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 139.0, 239.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.19",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.19",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc19"
                }
            },
            {
                "box": {
                    "id": "obj-49",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 138.5, 392.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 105.0, 210.0, 24.0, 24.0 ],
                    "varname": "enb18"
                }
            },
            {
                "box": {
                    "id": "obj-50",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 129.5, 421.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 96.0, 239.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.18",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.18",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc18"
                }
            },
            {
                "box": {
                    "id": "obj-51",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 95.5, 392.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 62.0, 210.0, 24.0, 24.0 ],
                    "varname": "enb17"
                }
            },
            {
                "box": {
                    "id": "obj-52",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 86.5, 421.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 53.0, 239.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.17",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.17",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc17"
                }
            },
            {
                "box": {
                    "id": "obj-53",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 52.5, 392.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 19.0, 210.0, 24.0, 24.0 ],
                    "varname": "enb16"
                }
            },
            {
                "box": {
                    "id": "obj-54",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 43.5, 421.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 10.0, 239.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.16",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.16",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc16"
                }
            },
            {
                "box": {
                    "id": "obj-23",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 359.5, 300.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 326.0, 118.0, 24.0, 24.0 ],
                    "varname": "enb15"
                }
            },
            {
                "box": {
                    "id": "obj-24",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 350.5, 329.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 317.0, 147.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.15",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.15",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc15"
                }
            },
            {
                "box": {
                    "id": "obj-25",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 316.5, 300.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 283.0, 118.0, 24.0, 24.0 ],
                    "varname": "enb14"
                }
            },
            {
                "box": {
                    "id": "obj-26",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 307.5, 329.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 274.0, 147.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.14",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.14",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc14"
                }
            },
            {
                "box": {
                    "id": "obj-27",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 273.5, 300.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 240.0, 118.0, 24.0, 24.0 ],
                    "varname": "enb13"
                }
            },
            {
                "box": {
                    "id": "obj-28",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 264.5, 329.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 231.0, 147.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.13",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.13",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc13"
                }
            },
            {
                "box": {
                    "id": "obj-29",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 230.5, 300.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 197.0, 118.0, 24.0, 24.0 ],
                    "varname": "enb12"
                }
            },
            {
                "box": {
                    "id": "obj-30",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 221.5, 329.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 188.0, 147.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.12",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.12",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc12"
                }
            },
            {
                "box": {
                    "id": "obj-31",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 181.5, 300.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 148.0, 118.0, 24.0, 24.0 ],
                    "varname": "enb11"
                }
            },
            {
                "box": {
                    "id": "obj-32",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 172.5, 329.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 139.0, 147.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.11",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.11",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc11"
                }
            },
            {
                "box": {
                    "id": "obj-33",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 138.5, 300.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 105.0, 118.0, 24.0, 24.0 ],
                    "varname": "enb10"
                }
            },
            {
                "box": {
                    "id": "obj-34",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 129.5, 329.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 96.0, 147.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.10",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.10",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc10"
                }
            },
            {
                "box": {
                    "id": "obj-35",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 95.5, 300.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 62.0, 118.0, 24.0, 24.0 ],
                    "varname": "enb09"
                }
            },
            {
                "box": {
                    "id": "obj-36",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 86.5, 329.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 53.0, 147.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.09",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.09",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc09"
                }
            },
            {
                "box": {
                    "id": "obj-37",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 52.5, 300.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 19.0, 118.0, 24.0, 24.0 ],
                    "varname": "enb08"
                }
            },
            {
                "box": {
                    "id": "obj-38",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 43.5, 329.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 10.0, 147.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.08",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.08",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc08"
                }
            },
            {
                "box": {
                    "id": "obj-20",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 359.5, 210.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 326.0, 23.0, 24.0, 24.0 ],
                    "varname": "enb07"
                }
            },
            {
                "box": {
                    "id": "obj-21",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 350.5, 239.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 317.0, 52.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.07",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.07",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc07"
                }
            },
            {
                "box": {
                    "id": "obj-18",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 316.5, 210.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 283.0, 23.0, 24.0, 24.0 ],
                    "varname": "enb06"
                }
            },
            {
                "box": {
                    "id": "obj-19",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 307.5, 239.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 274.0, 52.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.06",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.06",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc06"
                }
            },
            {
                "box": {
                    "id": "obj-16",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 273.5, 210.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 240.0, 23.0, 24.0, 24.0 ],
                    "varname": "enb05"
                }
            },
            {
                "box": {
                    "id": "obj-17",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 264.5, 239.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 231.0, 52.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.05",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.05",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc05"
                }
            },
            {
                "box": {
                    "id": "obj-14",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 230.5, 210.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 197.0, 23.0, 24.0, 24.0 ],
                    "varname": "enb04"
                }
            },
            {
                "box": {
                    "id": "obj-15",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 221.5, 239.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 188.0, 52.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.04",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.04",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc04"
                }
            },
            {
                "box": {
                    "id": "obj-12",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 181.5, 210.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 148.0, 23.0, 24.0, 24.0 ],
                    "varname": "enb03"
                }
            },
            {
                "box": {
                    "id": "obj-13",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 172.5, 239.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 139.0, 52.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.03",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.03",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc03"
                }
            },
            {
                "box": {
                    "id": "obj-10",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 138.5, 210.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 105.0, 23.0, 24.0, 24.0 ],
                    "varname": "enb02"
                }
            },
            {
                "box": {
                    "id": "obj-11",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 129.5, 239.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 96.0, 52.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.02",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.02",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc02"
                }
            },
            {
                "box": {
                    "id": "obj-8",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 95.5, 210.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 62.0, 23.0, 24.0, 24.0 ],
                    "varname": "enb01"
                }
            },
            {
                "box": {
                    "id": "obj-9",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 86.5, 239.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 53.0, 52.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.01",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.01",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc01"
                }
            },
            {
                "box": {
                    "id": "obj-7",
                    "maxclass": "led",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 52.5, 210.0, 24.0, 24.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 19.0, 23.0, 24.0, 24.0 ],
                    "varname": "enb00"
                }
            },
            {
                "box": {
                    "id": "obj-6",
                    "maxclass": "live.dial",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 44.0, 239.0, 41.0, 48.0 ],
                    "presentation": 1,
                    "presentation_rect": [ 10.0, 52.0, 41.0, 48.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "enc.00",
                            "parameter_modmode": 4,
                            "parameter_shortname": "enc.00",
                            "parameter_type": 1,
                            "parameter_unitstyle": 0
                        }
                    },
                    "varname": "enc00"
                }
            },
            {
                "box": {
                    "id": "obj-2",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "" ],
                    "patching_rect": [ 532.0, 439.0, 270.0, 22.0 ],
                    "saved_object_attributes": {
                        "filename": "ExecutiveControllerLibrarian.js",
                        "parameter_enable": 0
                    },
                    "text": "js ExecutiveControllerLibrarian.js @autowatch 1",
                    "varname": "librarian"
                }
            },
            {
                "box": {
                    "id": "obj-1",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 5,
                    "outlettype": [ "dictionary", "", "", "", "" ],
                    "patching_rect": [ 519.0, 7.0, 200.5, 22.0 ],
                    "saved_object_attributes": {
                        "legacy": 1,
                        "parameter_enable": 0,
                        "parameter_mappable": 0
                    },
                    "text": "dict C4DeviceExecutiveController",
                    "varname": "maxExecControllerDictInLibrarian"
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "destination": [ "obj-135", 0 ],
                    "source": [ "obj-103", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-5", 0 ],
                    "source": [ "obj-127", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-131", 0 ],
                    "source": [ "obj-129", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-5", 0 ],
                    "source": [ "obj-129", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-129", 0 ],
                    "source": [ "obj-130", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-2", 0 ],
                    "source": [ "obj-131", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-137", 1 ],
                    "source": [ "obj-135", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-137", 2 ],
                    "source": [ "obj-136", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-102", 1 ],
                    "order": 0,
                    "source": [ "obj-137", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-74", 0 ],
                    "order": 1,
                    "source": [ "obj-137", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-137", 3 ],
                    "source": [ "obj-138", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-86", 0 ],
                    "source": [ "obj-147", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-136", 0 ],
                    "source": [ "obj-148", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-138", 0 ],
                    "source": [ "obj-149", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-130", 0 ],
                    "source": [ "obj-22", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-4", 0 ],
                    "source": [ "obj-3", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-2", 0 ],
                    "source": [ "obj-5", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-2", 0 ],
                    "source": [ "obj-74", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-137", 0 ],
                    "source": [ "obj-86", 0 ]
                }
            }
        ],
        "parameters": {
            "obj-11": [ "enc.02", "enc.02", 0 ],
            "obj-13": [ "enc.03", "enc.03", 0 ],
            "obj-15": [ "enc.04", "enc.04", 0 ],
            "obj-17": [ "enc.05", "enc.05", 0 ],
            "obj-19": [ "enc.06", "enc.06", 0 ],
            "obj-21": [ "enc.07", "enc.07", 0 ],
            "obj-24": [ "enc.15", "enc.15", 0 ],
            "obj-26": [ "enc.14", "enc.14", 0 ],
            "obj-28": [ "enc.13", "enc.13", 0 ],
            "obj-30": [ "enc.12", "enc.12", 0 ],
            "obj-32": [ "enc.11", "enc.11", 0 ],
            "obj-34": [ "enc.10", "enc.10", 0 ],
            "obj-36": [ "enc.09", "enc.09", 0 ],
            "obj-38": [ "enc.08", "enc.08", 0 ],
            "obj-40": [ "enc.23", "enc.23", 0 ],
            "obj-42": [ "enc.22", "enc.22", 0 ],
            "obj-44": [ "enc.21", "enc.21", 0 ],
            "obj-46": [ "enc.20", "enc.20", 0 ],
            "obj-48": [ "enc.19", "enc.19", 0 ],
            "obj-50": [ "enc.18", "enc.18", 0 ],
            "obj-52": [ "enc.17", "enc.17", 0 ],
            "obj-54": [ "enc.16", "enc.16", 0 ],
            "obj-56": [ "enc.31", "enc.31", 0 ],
            "obj-58": [ "enc.30", "enc.30", 0 ],
            "obj-6": [ "enc.00", "enc.00", 0 ],
            "obj-60": [ "enc.29", "enc.29", 0 ],
            "obj-62": [ "enc.28", "enc.28", 0 ],
            "obj-64": [ "enc.27", "enc.27", 0 ],
            "obj-66": [ "enc.26", "enc.26", 0 ],
            "obj-68": [ "enc.25", "enc.25", 0 ],
            "obj-70": [ "enc.24", "enc.24", 0 ],
            "obj-9": [ "enc.01", "enc.01", 0 ],
            "parameterbanks": {
                "0": {
                    "index": 0,
                    "name": "",
                    "parameters": [ "-", "-", "-", "-", "-", "-", "-", "-" ],
                    "buttons": [ "-", "-", "-", "-", "-", "-", "-", "-" ]
                }
            },
            "inherited_shortname": 1
        },
        "autosave": 0
    }
}