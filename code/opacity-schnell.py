from manim import *
import scipy as sc
import numpy as np


class LightAndSquare(Scene):
    def construct(self):
        square = Square(side_length=4, fill_opacity=1, color=BLUE)
        
        circle = Circle(radius=1.5, color=WHITE).move_to(square.get_center())
        circle.set_fill(opacity=0)  # Starting opacity (0)
        circle.set_stroke(width=0)

        combined_shape = VGroup(square, circle)

        opacity_text = Text("Opazität: 0%").move_to(UP * 3)
        self.add(opacity_text)

        self.play(FadeIn(combined_shape))
        self.wait(2)

        for i in range(100):
            opacity_value = (i + 1) / 100
            circle.set_fill(opacity=opacity_value)
            opacity_text.become(Text(f"Opazität: {int(round(opacity_value * 100))}%").move_to(UP * 3))
            self.play(circle.animate.set_fill(opacity=opacity_value), run_time=0.05)
            self.wait(0.01)

        self.wait(2)
