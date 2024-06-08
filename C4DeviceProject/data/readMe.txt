comments about the JSON dict reference files in this directory.

ledRingFeedbackStyleReference.json
- contains implementation details associated with how the C4 encoder led rings respond to midi CC data
  the ring consists of 11 led "pills" arrayed around the associated encoder, 1 in the center at "12 o'clock" and 5 around either side.
  the ring also contains a "single dot" led below the "pills" at "6 o'clock". For any CC data value > 64, the "dot" will be lit.  Specifically, 
  the "dot" will turn off given the exact style values in this reference, and the "dot" will turn on given the same reference values + 64.
  
rowMap16RowsOf8Keys.json
- contains "keys" that also function as encoder row identifiers with respect to, for example, which lcd screen is over which encoder. 
  any of the 16 row ids here % 4 represents the associated physical C4 encoder row where the 8 associated "encoder keys" are wired.  So, the (virtual) 
  encoder with id 127 is associated with row 15, the last row, and 15 % 4 = 3 so that last row of 8 (virtual) encoder keys represents the bottom 
  physical row of encoders.  These encoder id values like 127 are the keys for the other reference Dict objects in the project, specifically the "encoders" dict. 
  which tracks "fader levels" 0 - 127 based on the +/- values each physical encoder sends.  These "row value encoder keys" could also be used as reference keys 
  into other encoder related dicts such as ones for storing custom encoder "display names", "ring feedback styles", or whatever.
  
 c4Encoder.json, c4Button.json
 - contain "default objects" named "000"