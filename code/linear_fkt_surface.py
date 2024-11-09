from manim import *
import numpy as np
from lib import *
import pandas as pd

class LightAndSquare(ThreeDScene):

    def construct(self):
        self.move_camera(zoom=0.1)
        
        # Create 3D axes
        axes = ThreeDAxes()
        
        # Labels for the axes
        label_x = MathTex("a").scale(0.8).next_to(axes.x_axis, RIGHT, buff=0.2)
        label_y = MathTex("b").scale(0.8).next_to(axes.y_axis, UP, buff=0.2)
        label_z = MathTex("\\chi^2").scale(0.8).next_to(axes.z_axis, OUT, buff=0.2)

        # Rotate label_z by 190 degrees around the x-axis
        label_z.rotate(190 * DEGREES, axis=RIGHT)

        labels = VGroup(label_x, label_y, label_z)
        
        # Define the x and y data (using global variables or define them here)
        x = x_lin_global
        y = y_lin_global
        
        # Create the surface with the equation for chi^2
        surface = Surface(
            lambda a, b: np.array([
                a,  # x-axis
                b,   # y-axis
                np.sum((y - lin_fkt(x, a, b))**2 / np.full_like(a, 0.3)**2)/100  # chi^2 expression
            ]),
            u_range=[-0.2, 1.5],
            v_range=[-1.4, 4],
            resolution=(2, 2)  
        )

        surface.set_fill_by_value(
            axes=axes,  
            colorscale=[(GREEN, 0), (YELLOW, 0.5), (RED, 1)],
            axis=2
        )
        surface.set_style(fill_opacity=0.7)

        # Set camera zoom and add elements to the scene
        self.set_camera_orientation(zoom=0.5)
        self.add(axes, labels, surface)
        
        # Show the chi^2 equation
        self.get_equation()
        
        # Wait a moment before moving the camera
        self.wait(0.5)
        
        # Move the camera to a new angle
        self.move_camera(phi=50 * DEGREES, theta=30 * DEGREES, zoom=1, run_time=3)
        self.begin_ambient_camera_rotation(rate=0.15)
        
        # Wait for 20 seconds
        self.wait(20)

    def get_equation(self):
        # Create the chi^2 equation
        equation = Text(
            r"\chi^2 = \sum \left( \frac{(y_{\text{data}} - y_{\text{theo}})^2}{\\sigma_{\text{y}}^2} \right)"
        )
        # Animate the appearance of the equation in the scene
        self.play(FadeIn(equation.to_corner(DR)))
