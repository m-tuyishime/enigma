$(async () => {
    const config = await getStartConfig();
    // draw the rows and input their values
    drawRow(config.refl, "refl", ".reflector");
    drawRow(config.r2[0], "r2-0", ".r2 .row0");
    drawRow(config.r2[1], "r2-1", ".r2 .row1");
    drawRow(config.r1[0], "r1-0", ".r1 .row0");
    drawRow(config.r1[1], "r1-1", ".r1 .row1");
    drawRow(config.r0[0], "r0-0", ".r0 .row0");
    drawRow(config.r0[1], "r0-1", ".r0 .row1");
    drawRow(config.l, "l", ".letters");
});