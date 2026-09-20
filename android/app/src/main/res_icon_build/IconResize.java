import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.LinkedHashMap;
import java.util.Map;

public class IconResize {
    public static void main(String[] args) throws Exception {
        StringBuilder sb = new StringBuilder();
        File logo = new File(args[0]);
        File resRoot = new File(args[1]);
        BufferedImage src = ImageIO.read(logo);
        if (src == null) {
            sb.append("LOGO_READABLE=false\n");
            System.out.print(sb.toString());
            return;
        }
        sb.append("LOGO_READABLE=true W=").append(src.getWidth())
          .append(" H=").append(src.getHeight()).append("\n");

        Map<String, Integer> sizes = new LinkedHashMap<>();
        sizes.put("mipmap-mdpi", 48);
        sizes.put("mipmap-hdpi", 72);
        sizes.put("mipmap-xhdpi", 96);
        sizes.put("mipmap-xxhdpi", 144);
        sizes.put("mipmap-xxxhdpi", 192);

        for (Map.Entry<String, Integer> e : sizes.entrySet()) {
            String dirName = e.getKey();
            int sz = e.getValue();
            File dir = new File(resRoot, dirName);
            BufferedImage out = new BufferedImage(sz, sz, BufferedImage.TYPE_INT_ARGB);
            Graphics2D g = out.createGraphics();
            g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
            g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
            g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g.drawImage(src, 0, 0, sz, sz, null);
            g.dispose();
            writePng(dir, "ic_launcher.png", out);
            writePng(dir, "ic_launcher_round.png", out);
            writePng(dir, "ic_launcher_foreground.png", out);
            sb.append(dir.getName()).append(" size=").append(sz).append(" wrote=ic_launcher.png len=")
              .append(new File(dir, "ic_launcher.png").length()).append("\n");
        }
        sb.append("DONE\n");
        System.out.print(sb.toString());
    }

    static void writePng(File dir, String name, BufferedImage img) throws Exception {
        if (!dir.exists()) {
            dir.mkdirs();
        }
        File f = new File(dir, name);
        ImageIO.write(img, "png", f);
        if (!f.exists()) {
            throw new IllegalStateException("write failed: " + f.getPath());
        }
    }
}
