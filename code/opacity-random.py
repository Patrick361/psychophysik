from manim import *
import random

class LightAndSquare(Scene):
    def construct(self):
        # Create square and circle shapes
        square = Square(side_length=4, fill_opacity=1, color=BLUE)
        circle = Circle(radius=1.5, color=WHITE).move_to(square.get_center())
        circle.set_fill(opacity=0)  
        circle.set_stroke(width=0)

        combined_shape = VGroup(square, circle)

        #opacity_text = Text(f"Opazität: 0.0%").move_to(UP * 3)
        #self.add(opacity_text)

        self.play(FadeIn(combined_shape))
        # self.wait(1)

        opacity_values = random.sample([i / 1000 for i in range(91)], 60)
        
        with open("opacity_values.txt", "w") as f:
            f.write("\n".join(map(str, opacity_values)))  

        for opacity_value in opacity_values:
            circle.set_fill(opacity=opacity_value)
            #opacity_text.become(Text(f"Opazität: {float(round(opacity_value * 100, 2))}%").move_to(UP * 3))
            self.play(circle.animate.set_fill(opacity=opacity_value), run_time=0.1)
            self.wait(1)
