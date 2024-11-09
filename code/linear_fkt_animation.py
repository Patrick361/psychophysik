from manim import *
import numpy as np

class GraphExample(Scene):
    def construct(self):
        axes = Axes(x_range=[-3, 7], y_range=[-3, 7])
        labels = axes.get_axis_labels(x_label="x", y_label="y")

        first = Dot(color=RED).move_to(axes.c2p(2, 2.2))
        second = Dot(color=RED).move_to(axes.c2p(5, 3.7))

        label_P = Text("P").next_to(first, UP)
        label_Q = Text("Q").next_to(second, UP)

        self.play(Write(axes), Write(labels))
        self.play(AnimationGroup(FadeIn(first), FadeIn(second), lag_ratio=1))
        
        self.play(FadeIn(label_P), FadeIn(label_Q))
        self.wait(15)
        self.play(FadeOut(label_P), FadeOut(label_Q))


        def f1(x):
            return 0.6 * x
        g1 = axes.plot(f1, color=RED)
        first_line = Line(first.get_center(), axes.c2p(2, f1(2)), color=BLUE)
        second_line = Line(second.get_center(), axes.c2p(5, f1(5)), color=BLUE)
        
        equation = MathTex(r"f(x) = 0.6x").to_corner(UL)  
        self.play(Write(g1), Write(equation))  
        self.wait(10)
        self.play(Write(first_line), Write(second_line))
        self.wait(10)



        def f2(x):
            return 1.2 * x + 1
        self.play(
            Transform(g1, axes.plot(f2, color=RED)),
            Transform(equation, MathTex(r"f(x) = 1.2x + 1").to_corner(UL)),  # Update equation
            first_line.animate.put_start_and_end_on(first.get_center(), axes.c2p(2, f2(2))),
            second_line.animate.put_start_and_end_on(second.get_center(), axes.c2p(5, f2(5)))
        )
        self.wait(6)

       

        def f3(x):
            return 0.1 * x + 2
        self.play(
            Transform(g1, axes.plot(f3, color=RED)),
            Transform(equation, MathTex(r"f(x) = 0.1x + 2").to_corner(UL)),  # Update equation
            first_line.animate.put_start_and_end_on(first.get_center(), axes.c2p(2, f3(2))),
            second_line.animate.put_start_and_end_on(second.get_center(), axes.c2p(5, f3(5)))
        )
        self.wait(6)



        def f4(x):
            return -1.5 * x + 4
        self.play(
            Transform(g1, axes.plot(f4, color=RED)),
            Transform(equation, MathTex(r"f(x) = -1.5x + 4").to_corner(UL)),  # Update equation
            first_line.animate.put_start_and_end_on(first.get_center(), axes.c2p(2, f4(2))),
            second_line.animate.put_start_and_end_on(second.get_center(), axes.c2p(5, f4(5)))
        )
        self.wait(50)






