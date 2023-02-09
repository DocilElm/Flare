/// <reference types="../CTAutocomplete" />
import PogObject from "PogData"

const data = new PogObject("Flare", {
    pos: [10, 10],
    size: [50, 50],
    firstTime: true
}, ".flareData.json")

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const GuiDisplay = new Gui()
const txt = "Click anywhere to move You can also use scroll to adjust the size!"
const img = new Image("e.png", "https://i.imgur.com/kzquX9H.png")

const flaresTextures =[
  //Warning Flare Texture
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzMwNjIyMywKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjJlMmJmNmMxZWMzMzAyNDc5MjdiYTYzNDc5ZTU4NzJhYzY2YjA2OTAzYzg2YzgyYjUyZGFjOWYxYzk3MTQ1OCIKICAgIH0KICB9Cn0=",
  //Missing Alert Flare Texture
  //
  //SOS Flare Texture
  "ewogICJ0aW1lc3RhbXAiIDogMTY0NjY4NzM0NzQ4OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzAwNjJjYzk4ZWJkYTcyYTZhNGI4OTc4M2FkY2VmMjgxNWI0ODNhMDFkNzNlYTg3YjNkZjc2MDcyYTg5ZDEzYiIKICAgIH0KICB9Cn0="
]
let flareIsDown = false

register("step", () => {
  if(!World.isLoaded()) return
  if (data.firstTime) {
    data.firstTime = false
    data.save()
    ChatLib.chat("")
    new TextComponent(ChatLib.getCenteredText(`&aDo /flare To Edit The Display!`)).chat()
    new TextComponent(ChatLib.getCenteredText(`&aJoin Our Discord!  &b&nDiscord&r &7(Click)`)).setClickAction("open_url").setClickValue("https://discord.gg/SK9UDzquEN").chat()
    ChatLib.chat("")
  }

  flareIsDown = World.getAllEntities().filter(filter => filter !== null && filter.distanceTo(Player.getPlayer()) < 40 && filter.getEntity() instanceof ArmorStand).some(e => flaresTextures.some(texture => e.getEntity()?.func_82169_q(3)?.func_77978_p()?.toString()?.includes(texture))) ?? false
}).setFps(3)

register("renderOverlay", () => {
  if (GuiDisplay.isOpen()) {
    Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2)
    img.draw(data.pos[0], data.pos[1], data.size[0], data.size[1])
  }
  if(!World.isLoaded() || !flareIsDown) return

  img.draw(data.pos[0], data.pos[1], data.size[0], data.size[1])
})

register("command", () => GuiDisplay.open()).setName("flare")

register("dragged", (dx, dy, x, y) => {
    if (!GuiDisplay.isOpen()) return

    data.pos[0] = x
    data.pos[1] = y
    data.save()
})

register("scrolled", (mX, mY, dir) => {
  if (!GuiDisplay.isOpen()) return

  if(dir === 1)
    data.size[0] += 1, data.size[1] += 1, data.save()
  else
    data.size[0] -= 1, data.size[1] -= 1, data.save()
})