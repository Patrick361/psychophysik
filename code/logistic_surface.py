from manim import *
import numpy as np
from lib import *
import pandas as pd

class LightAndSquare(ThreeDScene):
    def construct(self):
        self.move_camera(zoom=0.1)
        axes = ThreeDAxes()

        labels = axes.get_axis_labels(
           MathTex(r"\alpha").scale(0.5), MathTex(r"\beta").scale(0.5), MathTex(r"\chi^2").scale(0.5)
        )   
        x, y = self.get_data()

        surface = Surface(
            lambda alpha, beta: np.array([
                alpha,  # x-axis
                beta,   # y-axis
                np.sum((y - logistic_fkt(x, alpha, beta))**2 / np.full_like(alpha,0.2)**2)/100
            ]),
            u_range=[0, 3.5],
            v_range=[0, 3.5],
            resolution=(30, 30)  # Higher resolution for smoother gradient
        )

        surface.set_fill_by_value(
            axes=axes,  # Color according to z-value
            colorscale=[(GREEN, 0), (YELLOW, 0.5), (RED, 1)],
            axis=2
        )
        surface.set_style(fill_opacity=0.7)

        self.set_camera_orientation(zoom=0.5)
        self.add(axes, labels, surface)
        
        self.wait(0.5)
        self.move_camera(phi=75 * DEGREES, theta= 10 * DEGREES, zoom=1, run_time=3)
        self.begin_ambient_camera_rotation(rate=0.15)
        
        self.wait(10)

    def get_data(self):
        path = "data/userdata_rows.csv" 
        x = np.loadtxt('opacity_values.txt') * 100 
        arr = import_data(path) 
        y = calculate_true_probabilities(arr)
        return x, y
