{
  /* <Animated.View
        style={{
          elevation: 200,
          zIndex: 200,
          top: 0,
          // transform: [{ translateY: panelLow ? navigationY : headerY }], //panelLow ? navigationY : headerY }],
        }}
      >
        <SlidingUpPanel
          allowDragging={allowDragging}
          draggableRange={{
            top: top,
            bottom: 0,
          }}
          height={top}
          onBottomReached={() => {
            setPanelLow(false);
            // setTimeout(() => setPanelLoading(true), 0);
          }}
          // onDragStart={(position)}
          onMomentumDragStart={(position) => {
            if (position == top) {
              setPanelLow(false);
            }
          }}
          onMomentumDragEnd={(position) => {
            InteractionManager.runAfterInteractions(() => {
              if (position == low) {
                setPanelLow(true);
              }
              if (position == 0) {
              }
            });
          }}
          ref={(c) => (_panel = c)}
          // snappingPoints={[0, low, top]}
          showBackdrop={false}
          style={{
            position: "relative",
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 4,
              borderWidth: 0.2,
              borderColor: colors.medium,
              flex: 1,
              height: HEADER_HEIGHT,
              justifyContent: "flex-start",
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderColor: colors.medium,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    name="marker"
                    color={colors.black}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderColor: colors.medium,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    name="bookmark-outline"
                    color={colors.black}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderColor: colors.medium,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                  onPress={toggleParagraphView}
                >
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={colors.black}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderColor: colors.medium,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    name="file-multiple"
                    color={colors.black}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    borderColor: colors.medium,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                  onPress={toggleParagraphView}
                >
                  <MaterialCommunityIcons
                    name="file-upload-outline"
                    color={colors.black}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Button
                  title="Low"
                  onPress={() => {
                    _panel.show(low);
                    InteractionManager.runAfterInteractions(() => {
                      setPanelLow(true);
                    });
                  }}
                />
                <Button title="Done" onPress={() => _panel.hide()} />
              </View>
            </View>

            <View>
              <ActivityIndicator visible={panelLoading} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <AppText
                  style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    paddingVertical: 10,
                  }}
                >
                  {currentBook.label + " " + verseReference}
                </AppText>
              </View>
              <ScrollView
                onTouchStart={() => setAllowDragging(false)}
                onTouchEnd={() => setAllowDragging(true)}
                onTouchCancel={() => setAllowDragging(true)}
                showsVerticalScrollIndicator={false}
              >
                <PanelBox
                  fontSize={fontSize}
                  // crossrefSize={crossrefSize}
                  verseContent={verseContent}
                  johnsNote={johnsNote}
                  // landscape={landscape}
                ></PanelBox>
              </ScrollView>
            </View>
          </View>
        </SlidingUpPanel>
      </Animated.View> */
}
