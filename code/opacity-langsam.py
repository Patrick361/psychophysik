from manim import *

class LightAndSquare_slow(Scene):
    def construct(self):
        square = Square(side_length=4, fill_opacity=1, color=BLUE)
        
        circle = Circle(radius=1.5, color=WHITE).move_to(square.get_center())
        circle.set_fill(opacity=0)  # Starting opacity (0)
        circle.set_stroke(width=0)


        combined_shape = VGroup(square, circle)

        opacity_text = Text(f"Opazität: 0.0%").move_to(UP * 3)
        self.add(opacity_text)

        self.play(FadeIn(combined_shape))
        self.wait(2)

        for i in range(150):
            opacity_value = (i+1)/1000
            circle.set_fill(opacity=opacity_value)
            opacity_text.become(Text(f"Opazität: {float(round(opacity_value * 100, 2))}%").move_to(UP * 3))
            self.play(circle.animate.set_fill(opacity=opacity_value), run_time=0.05)
            self.wait(0.01)
            

        self.wait(2)
